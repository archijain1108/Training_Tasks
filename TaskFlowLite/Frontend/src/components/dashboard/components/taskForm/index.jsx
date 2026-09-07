import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskSchema, updateTaskSchema } from "../../validation/index.js";
import { Task_FIELDS, TASK_UPDATE_FIELDS } from "../../constant/index.js";
import { useTask } from "../../hook/useTasks.jsx";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = ({ mode }) => {
  const schema = mode === "create" ? createTaskSchema : updateTaskSchema;
  const { handleCreateTask, handleUpdateTask, handleGetTaskById } = useTask();

  const fields = mode === "create" ? Task_FIELDS : TASK_UPDATE_FIELDS;

  const navigate = useNavigate();

  const Modes = {
    update: {
      button: "Update",
      title: "Update Task",
      submitting: "Updating Task...",
      success: "Task Updated Successfully",
    },
    create: {
      button: "Create",
      title: "Create Task",
      submitting: "Creating Task...",
      success: "Task Created Successfully",
    },
  };

  const { taskId } = useParams();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getTask = async () => {
      if (!taskId) {
        console.log("id", taskId);
        reset({
          title: "",
          description: "",
          priority: "",
          status: "",
          dueDate: "",
        });
        return;
      }

      const task = await handleGetTaskById(taskId);

      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
      });
    };
    getTask();
  }, [taskId, reset]);

  async function onSubmit(data) {
    const formattedData = {
      ...data,
      dueDate: data.dueDate.toISOString().split("T")[0],
    };

    console.log(formattedData);

    try {
      if (mode === "create") {
        await handleCreateTask(formattedData);
      } else {
        const changedData = {};

        Object.keys(dirtyFields).forEach((field) => {
          if (field === "dueDate") {
            changedData[field] = data[field].toISOString().split("T")[0];
          } else {
            changedData[field] = data[field];
          }
        });

        await handleUpdateTask(taskId, changedData);
      }
    } catch (err) {
      setError("root", {
        message: err.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.message ||
        "Something went wrong",
      });
    }

    reset();
    navigate("/");
  }

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg rounded-lg border border-blue-900/50
                   bg-gray-900 p-4 shadow-xl"
      >
        <section className="pb-4 flex items-center justify-between">
          <h4 className=" text-lg font-semibold text-blue-600">
            {Modes[mode].title}
          </h4>
          <span
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 cursor-pointer"
          >
            Back
          </span>
        </section>

        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="w-full rounded-lg border border-gray-800
               bg-black px-3 py-2.5 text-sm text-white
               outline-none transition
               focus:border-blue-600
               focus:ring-1 focus:ring-blue-600
               cursor-pointer"
                >
                  <option
                    value=""
                    disabled
                    className="bg-gray-950 text-gray-500"
                  >
                    Select {field.label}
                  </option>

                  {field.options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-950 text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name)}
                  className="w-full rounded-lg border border-gray-800
                                        bg-gray-950 px-3 py-2.5 text-sm text-white
                                        outline-none transition
                                        focus:border-blue-600
                                        focus:ring-1 focus:ring-blue-600"
                />
              )}

              {errors[field.name] && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5
                       text-sm font-semibold text-white transition
                       hover:bg-blue-700
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500
                       disabled:cursor-not-allowed
                       disabled:opacity-50"
        >
          {isSubmitting ? Modes[mode].submitting : Modes[mode].button}
        </button>

        {errors.root ? (
          <p
            className="mt-4 rounded-lg border border-red-500/20
                          bg-red-500/10 px-3 py-2 text-sm text-red-400"
          >
            {errors.root.message}
          </p>
        ) : (
          isSubmitSuccessful && (
            <p
              className="mt-4 rounded-lg border border-green-500/20
                          bg-green-500/10 px-3 py-2 text-center
                          text-sm text-green-400"
            >
              {Modes[mode].success}
            </p>
          )
        )}
      </form>
    </div>
  );
};

export default TaskForm;
