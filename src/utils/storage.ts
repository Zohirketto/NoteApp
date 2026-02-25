import { Platform } from 'react-native';

let mem: Record<string, string> = {};

let AS: any;
try {
  AS = require('@react-native-async-storage/async-storage').default;
} catch {}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  if (AS) {
    try {
      return await AS.getItem(key);
    } catch {
      return null;
    }
  }
  return mem[key] ?? null;
}

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, value);
      return;
    } catch {
      return;
    }
  }
  if (AS) {
    try {
      await AS.setItem(key, value);
      return;
    } catch {
      return;
    }
  }
  mem[key] = value;
}

async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const raw = await getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function setJSON(key: string, value: any): Promise<void> {
  try {
    const raw = JSON.stringify(value);
    await setItem(key, raw);
  } catch {
    return;
  }
}

export const storage = { getItem, setItem, getJSON, setJSON };
