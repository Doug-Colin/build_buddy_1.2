import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';



export default function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* wrap everything in <div> set to 'min-h-screen' so that card elements (forms, calculators etc) do not move around on the scree (otherwise they were shifting when the modal poppued up for theme setting) */}
        <div className="min-h-screen">
        <Router>
            {/* Only routes can go inside route tag */}
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              {/* <Route path='/task-setter' element={<TaskSetter />} />
            <Route path='/convert' element={<UnitConversion />} />
            <Route path='/calculate' element={<Calculations />} /> */}
            </Routes>
        </Router>
        </div>
      </ThemeProvider>
  )
}


