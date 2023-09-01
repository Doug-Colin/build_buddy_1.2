import axios from 'axios';

//Function to minimize AxiosError type checking code in thunk actions
export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
      return (
        error.response?.data?.error?.message || error.message || error.toString()
      );
    }
    return "An unknown error occurred.";
  }