Ongoing list of issues to sort out/revisit:

Redux Dev Tools slow state middlware - perhaps from the non-async actions you put into noteSlice (setCurrentNote and clearCurren)- may make sense to bring them back to component level
"VM276:6 SerializableStateInvariantMiddleware took 116ms, which is more than the warning threshold of 32ms.
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that."
