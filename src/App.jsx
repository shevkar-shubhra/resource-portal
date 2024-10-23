import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthContainer from './components/Login';
import LandingPage from './components/Main'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element:<AuthContainer/>
    },
    {
      path: '/',
      element:<LandingPage/>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  )
}
 
export default App;

