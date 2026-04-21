import './App.css'
import { Navigate, useRoutes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateGallery from './pages/CrewmateGallery'
import CrewmateDetails from './pages/CrewmateDetails'
import EditCrewmate from './pages/EditCrewmate'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'create', element: <CreateCrewmate /> },
        { path: 'gallery', element: <CrewmateGallery /> },
        { path: 'crewmates/:id', element: <CrewmateDetails /> },
        { path: 'crewmates/:id/edit', element: <EditCrewmate /> },
        { path: '*', element: <Navigate replace to="/" /> },
      ],
    },
  ])

  return element
}

export default App
