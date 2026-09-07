import React, { useEffect } from "react";
import Dashboard from "./components/dashboard/components";
import Form from "./components/auth/component";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./components/auth/hook/useAuth";
import TaskForm from "./components/dashboard/components/taskForm";
import Kanban from "./components/dashboard/components/kanban";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
    
    
    
  }, []);

  return (
    <div className="main bg-gray-800 w-full min-h-screen">
      <Routes>
        <Route path="/register" element={<Form mode="register" />} />
        <Route path="/login" element={<Form mode="login" />} />

        <Route path="/" element={<Dashboard />}>

          <Route path="/" element={<Kanban />} />
          <Route
            path="/create-task" element={<TaskForm mode="create" />}
          />
          <Route path="/update-task/:taskId" element={<TaskForm mode="update" />} />
        </Route>

        <Route path="*"  element={<h1 className="text-white p-6 text-center">404 | page not found </h1>} />
      </Routes>
    </div>
  );
};

export default App;
