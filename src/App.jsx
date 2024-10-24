import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthContainer from './components/Login';
import LandingPage from './components/Main'
import ContactForm from './components/Contact';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <AuthContainer />
    },
    {
      path: '/contact',
      element: <ContactForm />
    },
    {
      path: '/',
      element: <LandingPage />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App;

