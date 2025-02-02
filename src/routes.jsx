import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import TaskShow from "./components/TaskShow";
import TaskDetails from "./components/TaskDetails";
import Login from "./components/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const ProtectedRoute = ({ element }) => {
  const { authState } = useContext(AuthContext);
  return authState ? element : <Navigate to="/" />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 
    children: [
      { path: "/", element: <TaskShow /> }, //
      { path: "/tasks/:status", element: <ProtectedRoute element={<TaskShow />} /> }, 
      { path: "/task/:id", element: <ProtectedRoute element={<TaskDetails />} /> }, 
    ],
  },
  { path: "/login", element: <Login /> }, 
]);

export default routes;
