import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectToQueryString(obj: Record<string, any>): string {
  return Object.keys(obj)
    .map(key => {
      const value = obj[key];
      return encodeURIComponent(key) + '=' + encodeURIComponent(String(value));
    })
    .join('&');
}
