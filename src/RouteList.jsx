import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, 
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

const RouteList = () => {
  return <RouterProvider router={router} />;
};

export default RouteList;
