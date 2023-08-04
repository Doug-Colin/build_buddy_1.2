import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from '@/app/store'
import { ThemeProvider } from "@/components/theme-provider"
import LandingPage from '@/pages/landing-page/LandingPage';
import LoginPage from '@/pages/login-page/LoginPage';
import RegisterPage from '@/pages/register-page/RegisterPage';
import DashboardPage from '@/pages/dashboard-page/DashboardPage';
import ProjectsPage from '@/pages/projects-page/ProjectsPage';


export default function App() {

  return (
    <Provider store={store}>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* wrap everything in <div> set to 'min-h-screen' so that card elements (forms, calculators etc) do not move around on the scree (otherwise they were shifting when the modal poppued up for theme setting) */}
        <div className="min-h-screen">
        <Router>
            {/* Only routes can go inside route tag */}
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/projects' element={<ProjectsPage />} />
              {/* <Route path='/task-setter' element={<TaskSetter />} />
            <Route path='/convert' element={<UnitConversion />} />
            <Route path='/calculate' element={<Calculations />} /> */}
            </Routes>
        </Router>
        </div>
      </ThemeProvider>
      </Provider>
      </Provider>
  )
}


