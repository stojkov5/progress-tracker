import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import routes from "./routes.jsx";
import "./index.css";
import Layout from "./layout/Layout.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}>
          <Layout></Layout>
        </RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
