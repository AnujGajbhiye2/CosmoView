import { GoogleGenerativeAI } from '@google/generative-ai';
import type { MemoryCache } from '../../lib/cache/memoryCache.js';
import { AppError } from '../../lib/errors/AppError.js';
import type { Env } from '../../config/env.js';

export interface MissionBriefInput {
  query: string;
  totalHits: number;
  selectedItem?: {
    title: string;
    description: string | null;
    dateCreated: string;
  };
}

export interface MissionBriefResult {
  summary: string;
  signal: string;
  prompts: string[];
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1_000; // 2 hours

const SYSTEM_INSTRUCTION = `You are an expert NASA mission analyst and astronomer.
You help researchers explore NASA's image archive by providing concise, accurate mission briefs.
Respond ONLY to requests about NASA imagery, astronomy, space science, and related topics.
Always respond with valid JSON matching the requested schema.`;

export class GeminiService {
  private readonly client: GoogleGenerativeAI | null;
  private readonly env: Pick<Env, 'GOOGLE_AI_API_KEY' | 'AI_ENABLED_UNTIL'>;
  private readonly cache: MemoryCache;

  public constructor(env: Pick<Env, 'GOOGLE_AI_API_KEY' | 'AI_ENABLED_UNTIL'>, cache: MemoryCache) {
    this.env = env;
    this.cache = cache;
    this.client = env.GOOGLE_AI_API_KEY ? new GoogleGenerativeAI(env.GOOGLE_AI_API_KEY) : null;
  }

  public get isAvailable(): boolean {
    return this.client !== null;
  }

  public async generateMissionBrief(input: MissionBriefInput): Promise<MissionBriefResult> {
    if (!this.client) {
      throw new AppError('AI feature is not configured.', { code: 'AI_UNAVAILABLE', statusCode: 503 });
    }

    if (this.env.AI_ENABLED_UNTIL && new Date() > new Date(this.env.AI_ENABLED_UNTIL)) {
      throw new AppError('AI feature has expired.', { code: 'AI_EXPIRED', statusCode: 503 });
    }

    const cacheKey = `ai:brief:${input.query}:${input.selectedItem?.title ?? ''}`;
    const cached = this.cache.get<MissionBriefResult>(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    const descriptionSnippet = input.selectedItem?.description
      ? input.selectedItem.description.slice(0, 800)
      : 'No description available.';

    const userPrompt = `Generate a mission brief for a NASA image archive search.

Search query: "${input.query}"
Total matching images: ${input.totalHits.toLocaleString('en-US')}
${input.selectedItem ? `Selected image title: "${input.selectedItem.title}"
Selected image date: ${input.selectedItem.dateCreated}
Selected image description: ${descriptionSnippet}` : 'No image selected yet.'}

Respond with JSON in this exact shape:
{
  "summary": "<2-3 sentence overview of what this search reveals about NASA's archive>",
  "signal": "<1-2 sentence read on the significance or pattern of results>",
  "prompts": ["<follow-up question 1>", "<follow-up question 2>", "<follow-up question 3>"]
}`;

    const model = this.client.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.4
      }
    });

    let rawText: string;
    try {
      const result = await model.generateContent(userPrompt);
      rawText = result.response.text();
    } catch (cause) {
      const detail = cause instanceof Error ? cause.message : String(cause);
      throw new AppError('Gemini API request failed.', { code: 'AI_SERVICE_ERROR', statusCode: 502, details: detail, cause });
    }

    let parsed: MissionBriefResult;
    try {
      // Extract JSON object — Gemini sometimes wraps it in markdown fences
      const start = rawText.indexOf('{');
      const end = rawText.lastIndexOf('}');
      if (start === -1 || end === -1) throw new SyntaxError('No JSON object found');
      parsed = JSON.parse(rawText.slice(start, end + 1)) as MissionBriefResult;
    } catch (cause) {
      throw new AppError('Gemini returned malformed JSON.', { code: 'AI_PARSE_ERROR', statusCode: 502, details: rawText.slice(0, 200), cause });
    }

    this.cache.set(cacheKey, parsed, CACHE_TTL_MS);
    return parsed;
  }
}
