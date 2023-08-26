import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/*
--------------- Using Utils and TS ---------------

  Utils, or utility functions, are reusable functions that are needed in various places of your application.

  The criteria for what should or shouldn't be a utils function is:

  Reusability: primary reason for moving a function here is that it's logic that is reused.

  No Dependencies on App State: Utility functions should be "pure" and not dependent on the global app state (for ex. no reading from Redux store)

  Simple & testable: function with predictable outputs given same inputs.
  --------------- How to use your utils ---------------

  Simply import the util at the top of your component from the correct path, and call it in your component function.

  --------------- Advantages of utils ---------------

  The advantages of utils are those common to any advantageous programming approach- they help keep code DRY, organized, readable, testable, and maintainable.
*/
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}