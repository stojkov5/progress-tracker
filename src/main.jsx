import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}>
        <Dashboard />
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
