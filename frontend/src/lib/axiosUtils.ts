import axios from 'axios'

// Reduce code in Redux service files by centralizing initialization of config (auth token is sent as a Bearer token in the config arg of the appropriate Axios req. method)
export const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

// Minimize AxiosError type checking code in thunk actions
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
    return (
      error.response?.data?.error?.message || error.message || error.toString()
    )
  }
  return 'An unknown error occurred.'
}
