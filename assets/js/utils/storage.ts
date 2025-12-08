function getStorageDriver(local: boolean) {
  return window[`${local ? "local" : "session"}Storage`] as Storage;
}

function useStorage<T = string>(
  key: string,
  local: boolean,
  defaultValue?: T
): StorageValue<T> | StorageValueWithDefault<T> {
  const storage = getStorageDriver(local);
  const val = () => {
    const item = storage.getItem(key);
    const fallbackValue = defaultValue ?? null;
    if (item === null) {
      return fallbackValue;
    }
    try {
      return JSON.parse(item) as T;
    } catch {
      return fallbackValue;
    }
  };

  const setVal = (newValue: T | null) => {
    if (newValue === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(newValue));
    }
  };
  return [val, setVal];
}

export type StorageValue<T> = [() => T | null, (newValue: T | null) => void];
export type StorageValueWithDefault<T> = [
  () => T,
  (newValue: T | null) => void
];

export function useSessionStorage<T = string>(
  key: string,
  defaultValue?: never
): StorageValue<T>;
export function useSessionStorage<T = string>(
  key: string,
  defaultValue: T
): StorageValueWithDefault<T>;
export function useSessionStorage<T = string>(
  key: string,
  defaultValue?: T
): StorageValue<T> | StorageValueWithDefault<T> {
  return useStorage<T>(key, false, defaultValue);
}

export function useLocalStorage<T = string>(
  key: string,
  defaultValue?: never
): StorageValue<T>;
export function useLocalStorage<T = string>(
  key: string,
  defaultValue: T
): StorageValueWithDefault<T>;
export function useLocalStorage<T = string>(
  key: string,
  defaultValue?: T
): StorageValue<T> | StorageValueWithDefault<T> {
  return useStorage<T>(key, true, defaultValue);
}
