import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Home from './modules/Home/pages/Home';
import Login from './modules/Authentication/pages/Login';
import Register from './modules/Authentication/pages/Register';
import Workspace from './modules/Workspace/pages/Workspace';
import History from './modules/History/pages/History';
import HistoryDetails from './modules/History/pages/HistoryDetails';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import PublicRoutes from './PublicRoutes/PublicRoutes';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <PublicRoutes><Login /></PublicRoutes>,
  },
  {
    path: "/register",
    element: <PublicRoutes><Register /></PublicRoutes>,
  },
  {
    path: "/workspace",
    element: <ProtectedRoutes><Workspace /></ProtectedRoutes>,
  },
  {
    path: "/history",
    element: <ProtectedRoutes><History /></ProtectedRoutes>,
  },
  {
    path: "/history/:id",
    element: <ProtectedRoutes><HistoryDetails /></ProtectedRoutes>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

const App = () => {
  return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
        <RouterProvider router={routes}></RouterProvider>
      </>
  );
};

export default App;
