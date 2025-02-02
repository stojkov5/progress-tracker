import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import TaskShow from "./components/TaskShow";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <TaskShow /> }, 
      { path: "/tasks/:status", element: <TaskShow /> }, 
    ],
  },
]);

export default routes;
