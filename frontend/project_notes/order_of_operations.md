### Example of order of operations for user login:

Frontend:

1. **User Inputs Data (`LoginForm.tsx`)** :

* The user enters their login credentials into the form fields defined in `LoginForm.tsx` using controlled components (i.e., `useState` hooks).
* The input is validated against the rules defined in the corresponding Zod schema (`validators/loginSchema.ts`), which is imported and used in the `LoginForm.tsx`.

1. **Submit Button Clicked (`LoginForm.tsx`)** :

* The user clicks the submit button, which is associated with the `onSubmit` event handler in `LoginForm.tsx`.

1. **Dispatch Login Action (`LoginForm.tsx`)** :

* Inside the `onSubmit` function, the `dispatch` function from `useDispatch()` hook is called.
* The `login` action from `authSlice.ts` is dispatched with the user's credentials as the payload.

1. **Axios POST Request (`authSlice.ts`)** :

* Inside the `login` thunk in `authSlice.ts`, an axios POST request is made to the backend route `/api/users/login`.
* The request payload contains the user's credentials.

### Backend:

5. **Server Listening (`server.js`)** :

* The server, set up using Express in `server.js`, listens for incoming requests.

5. **Route Handling (`routes/userRoutes.js`)** :

* The POST request to the backend route `/api/users/login` is caught by the route defined in `routes/userRoutes.js`.
* The route handler calls the `authUser` function from `controllers/userController.js`.

5. **User Authentication (`controllers/userController.js`)** :

* Inside the `authUser` function, the `User` model (from `models/userModel.js`) is used to find a user with the provided email.
* If found, bcrypt is used to compare the provided password with the hashed password in the database.

5. **Successful Login (`controllers/userController.js`)** :

* If the password matches, a JWT token is generated using `jsonwebtoken`.
* The response sent to the frontend includes the user's details and the token.

5. **Unsuccessful Login (`controllers/userController.js`)** :

* If the email isn't found or the password doesn't match, an error response is generated using a custom error handler or directly via `res.status(401).json({ error: 'Invalid credentials' })`.

### Frontend:

10. **Update Redux State (`authSlice.ts`)** :

* The `authSlice.ts` listens for the response from the backend.
* On a successful login, the `loginSuccess` reducer updates the Redux state with the user's details and token.
* On an unsuccessful login, the `loginFail` reducer updates the state with an error message.

11. **Update UI (`LoginForm.tsx` and other components)** :

* The UI components, especially `LoginForm.tsx`, use the `useSelector` hook to listen for changes in the Redux state.
* If the login is successful, the `useEffect()` function in `LoginForm.tsx` (or another relevant component) checks for the presence of the user token and redirects the user to the dashboard using the `useNavigate()` hook or another routing mechanism.
* If the login is unsuccessful, the error message from the Redux state is displayed, typically using conditional rendering in `LoginForm.tsx`.

This refined breakdown should provide a clearer understanding of the login flow, specifying where each route and operation resides, whether on the frontend or backend.
