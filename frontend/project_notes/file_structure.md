
--------------- Backend: --------------- 
backend
 ┣ config
 ┃ ┗ db.js
 ┣ controllers
 ┃ ┣ calcController.js
 ┃ ┣ taskController.js
 ┃ ┗ userController.js
 ┣ middleware
 ┃ ┣ authMiddleware.js
 ┃ ┗ errorMiddleware.js
 ┣ models
 ┃ ┣ calcModel.js
 ┃ ┣ taskModel.js
 ┃ ┗ userModel.js
 ┃
 ┣ node_modules
 ┃ ┗  etc
 ┃
 ┣ project_notes
 ┃ ┣ backend_postman_notes.txt
 ┃ ┗ Postman GPT prompt.ini
 ┣ routes
 ┃ ┣ calcRoutes.js
 ┃ ┣ taskRoutes.js
 ┃ ┗ userRoutes.js
 ┣ .env
 ┣ .eslintrc.js
 ┣ .gitignore
 ┣ .prettierrc
 ┣ package-lock.json
 ┣ package.json
 ┗ server.js

--------------- Frontend: --------------- 

frontend
 ┣ src
 ┃ ┣ app
 ┃ ┃ ┣ hooks.ts
 ┃ ┃ ┗ store.ts
 ┃ ┣ assets
 ┃ ┣ components
 ┃ ┃ ┣ ui
 ┃ ┃ ┃ ┣ button.tsx
 ┃ ┃ ┃ ┣ card.tsx
 ┃ ┃ ┃ ┣ dropdown-menu.tsx
 ┃ ┃ ┃ ┣ form.tsx
 ┃ ┃ ┃ ┣ input.tsx
 ┃ ┃ ┃ ┣ label.tsx
 ┃ ┃ ┃ ┗ select.tsx
 ┃ ┃ ┣ ExampleForm.tsx
 ┃ ┃ ┣ Footer.tsx
 ┃ ┃ ┣ Header.tsx
 ┃ ┃ ┣ Spinner.tsx
 ┃ ┃ ┣ theme-provider.tsx
 ┃ ┃ ┗ ThemeToggle.tsx
 ┃ ┣ features
 ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┣ authService.ts	
 ┃ ┃ ┃ ┗ authSlice.ts		
 ┃ ┃ ┣ calculate
 ┃ ┃ ┃ ┗ calcSlice.js
 ┃ ┃ ┣ convert
 ┃ ┃ ┃ ┣ convertService.js
 ┃ ┃ ┃ ┗ convertSlice.js
 ┃ ┃ ┗ tasks
 ┃ ┃ ┃ ┣ taskService.js
 ┃ ┃ ┃ ┗ taskSlice.js
 ┃ ┣ lib
 ┃ ┃ ┣ assetUtils.ts
 ┃ ┃ ┗ utils.ts
 ┃ ┣ pages
 ┃ ┃ ┣ calculate-page
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ sub-calculator-page
 ┃ ┃ ┃ ┣ CalculatePage.tsx
 ┃ ┃ ┃ ┗ Cl
 ┃ ┃ ┣ convert-page
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┗ ConvertPage.tsx
 ┃ ┃ ┣ dashboard-page
 ┃ ┃ ┃ ┗ DashboardPage.tsx
 ┃ ┃ ┣ landing-page
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┗ FeatureCard.tsx
 ┃ ┃ ┃ ┗ LandingPage.tsx
 ┃ ┃ ┣ login-page
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┗ LoginForm.tsx
 ┃ ┃ ┃ ┣ LoginPage.tsx
 ┃ ┃ ┃ ┗ LoginPageTransition.tsx
 ┃ ┃ ┗ register-page
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┗ RegisterForm.tsx
 ┃ ┃ ┃ ┗ RegisterPage.tsx
 ┃ ┣ validators
 ┃ ┃ ┣ exampleRegisterSchema.ts
 ┃ ┃ ┣ loginSchema.ts
 ┃ ┃ ┗ registerSchema.ts
 ┃ ┣ App.css
 ┃ ┣ App.tsx
 ┃ ┣ index.css
 ┃ ┣ main.tsx
 ┃ ┗ vite-env.d.ts
 ┣ .eslintrc.cjs
 ┣ .gitignore
 ┣ components.json
 ┣ index.html
 ┣ package-lock.json
 ┣ package.json
 ┣ postcss.config.js
 ┣ README.md
 ┣ tailwind.config.js
 ┣ tsconfig.json
 ┣ tsconfig.node.json
 ┗ vite.config.ts
