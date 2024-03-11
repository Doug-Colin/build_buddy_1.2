import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { ThemeProvider } from '@/components/theme-provider'
import LandingPage from '@/pages/landing-page/LandingPage'
import LoginPage from '@/pages/login-page/LoginPage'
import RegisterPage from '@/pages/register-page/RegisterPage'
import DashboardPage from '@/pages/dashboard-page/DashboardPage'
import ProjectsPage from '@/pages/projects-page/ProjectsPage'
import TasksPage from './pages/tasks-page/TasksPage'
import NotesPage from './pages/notes-page/NotesPage'
import ClientsPage from './pages/clients-page/ClientsPage.tsx'
import ResponsiveTablePage from './pages/responsive-table-view/ResponsiveTablePage'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* wrap everything in <div> set to 'min-h-screen' to prevent components from moving on screen during modal/dialog/popup etc */}
        <div className="min-h-screen">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/responsive-detail-view" element={<ClientsPage />} />
              <Route
                path="/responsive-table-view"
                element={<ResponsiveTablePage />}
              />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  )
}
