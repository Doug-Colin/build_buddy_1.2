import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';



export default function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
      </ThemeProvider>
  )
}


