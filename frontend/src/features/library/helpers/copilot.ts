import type { ImageSearchDto, ImageSearchItemDto } from '~types/api';

interface MissionBrief {
  summary: string;
  prompts: string[];
  signal: string;
}

const truncateDescription = (value: string | null): string => {
  if (!value) {
    return 'Metadata is limited, so this result is best explored visually.';
  }

  return value.length > 180 ? `${value.slice(0, 177)}...` : value;
};

export const buildMissionBrief = (
  query: string,
  results: ImageSearchDto,
  selectedItem: ImageSearchItemDto | null
): MissionBrief => {
  const total = results.totalHits;
  const firstDate = selectedItem?.dateCreated.slice(0, 10) ?? 'Unknown date';
  const summary = selectedItem
    ? `Searching for "${query}" surfaced ${total.toLocaleString('en-US')} catalog hits. The current frame, "${selectedItem.title}", was created on ${firstDate} and suggests a useful line of inquiry around visual composition, mission context, and scientific subject matter.`
    : `Searching for "${query}" surfaced ${total.toLocaleString('en-US')} catalog hits. Use the result grid to identify the strongest candidate and inspect its metadata.`;

  const prompts = selectedItem
    ? [
        `Compare "${selectedItem.title}" with today's APOD and note what kind of space storytelling each image supports.`,
        `Use the ${query} search results to build a three-image mini exhibition around one scientific theme.`,
        `Read the description and ask what mission, instrument, or observation context would make this frame more meaningful to a viewer.`
      ]
    : [
        `Search for a narrower subject related to ${query} and compare how the archive changes.`,
        `Pick one image and trace what mission or instrument likely produced it.`,
        `Identify a visual pattern across this result set and turn it into a gallery narrative.`
      ];

  const signal = selectedItem ? truncateDescription(selectedItem.description) : 'Select a result to generate a stronger mission brief.';

  return {
    summary,
    prompts,
    signal
  };
};
