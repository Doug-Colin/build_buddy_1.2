
On typing Axios errors:
-`isAxiosError` is an Axios typeguard. Its type predicate is (payload: any) => payload is AxiosError<any, any>.  Use it for type safety in conditions, for ex.; if(axios.isAxiosError(error)) { error.response?.config }

On typing errors in catch clauses in TS:

- In TS, you can only type catch clause errors as 'unknown' or 'any'; use 'unknown' for greater type safety
- In JS, you can throw any value as an error (throw 404; throw "Hell why not") 
- Because of this, the possible values to catch are broad. Hence the 'unknown or any'.
- Use `unknown` over `any` for better type safety.
- Axios offers the `isAxiosError` typeguard for differentiation.
- Within a catch block, use it in an if statement.
- Type the response data using angle brackets with `isAxiosError`.
- For details, Ctrl+click on any TS element.
