import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import TaskShow from "./components/TaskShow";
import TaskDetails from "./components/TaskDetails"; // Import TaskDetails

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <TaskShow /> },
      { path: "/tasks/:status", element: <TaskShow /> },
      { path: "/task/:id", element: <TaskDetails /> }, // Ensure correct route
    ],
  },
]);

export default routes;
