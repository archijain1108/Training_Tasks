import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./store/AuthContext.jsx";
import TaskProvider from "./store/TaskContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>,
);
