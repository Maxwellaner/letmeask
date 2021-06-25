import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
]

export function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}