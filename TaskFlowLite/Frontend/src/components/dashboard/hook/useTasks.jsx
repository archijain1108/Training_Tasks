import { useContext } from "react";
import { getTasks, getTaskById } from "../../../services/get.api";
import { createTask } from "../../../services/post.api";
import { deleteTask } from "../../../services/delete.api";
import { updateTask, updateTaskStatus } from "../../../services/patch.api";
import { TaskContext } from "../../../store/TaskContext";

export const useTask = () => {
  const { setTasks, setLoading } = useContext(TaskContext);

  const handleCreateTask = async ({
    title,
    description,
    priority,
    dueDate,
  }) => {
    const data = await createTask({ title, description, priority, dueDate });
    setTasks(data.tasks);
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    await updateTask(taskId, updatedData);
    handleGetAllTasks();
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      handleGetAllTasks();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdateTaskStatus = async ({ taskId, status }) => {
    try {
      const data = await updateTaskStatus({ taskId, status });
      setTasks(data.tasks);
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleGetAllTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTaskById = async (taskId) => {
    try {
      const data = await getTaskById(taskId);
      return data.task;
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    handleCreateTask,
    handleDeleteTask,
    handleUpdateTask,
    handleUpdateTaskStatus,
    handleGetAllTasks,
    handleGetTaskById,
  };
};
