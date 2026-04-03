export interface AppErrorOptions {
  code: string;
  statusCode: number;
  details?: unknown;
  cause?: unknown;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;
  public readonly cause?: unknown;

  public constructor(message: string, options: AppErrorOptions) {
    super(message);
    this.name = 'AppError';
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.details = options.details;
    this.cause = options.cause;
  }
}
