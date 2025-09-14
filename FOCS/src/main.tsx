import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n";
import { AppWithMetadata } from "./AppWithMetadata.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <AppWithMetadata />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
