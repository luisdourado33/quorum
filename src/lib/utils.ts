// Tremor cx [v0.0.0]

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function simulateServerRequest<T>(
  response: T,
  delay: number
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), delay);
  });
}
