import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import TaskShow from "./components/TaskShow";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout with Sidebar
    children: [
      { path: "/", element: <TaskShow /> }, // Show all tasks
      { path: "/tasks/:status", element: <TaskShow /> }, // Show tasks filtered by status
    ],
  },
]);

export default routes;
