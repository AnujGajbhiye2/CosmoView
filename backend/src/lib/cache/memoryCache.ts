interface CacheEntry<TValue> {
  expiresAt: number;
  value: TValue;
}

export class MemoryCache {
  private readonly store = new Map<string, CacheEntry<unknown>>();

  public get<TValue>(key: string): TValue | undefined {
    const entry = this.store.get(key);

    if (!entry) {
      return undefined;
    }

    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value as TValue;
  }

  public set<TValue>(key: string, value: TValue, ttlMs: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }
}
