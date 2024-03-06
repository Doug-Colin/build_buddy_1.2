//Utils for styling shadcn/ui and Plate UI components

//Conditionally concatenates classNames by combining them into single string & filtering out falsy values.
import { type ClassValue, clsx } from 'clsx'

//Merges multiple instances of same Tailwind class into single optimized class.
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
