const STORAGE_PREFIX = "wcintro_";

export function getStorage<T>(key: string, defaultValue: T): T {
  const raw = localStorage.getItem(STORAGE_PREFIX + key);
  if (raw === null) return defaultValue;
  const parsed = JSON.parse(raw);
  return parsed as T;
}

export function setStorage<T>(key: string, value: T): void {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

export function removeStorage(key: string): void {
  localStorage.removeItem(STORAGE_PREFIX + key);
}
