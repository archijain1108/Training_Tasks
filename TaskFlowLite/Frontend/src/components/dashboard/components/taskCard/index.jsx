import { useNavigate } from "react-router-dom";

const TaskCard = ({ task , handleDeleteTask}) => {

    const navigate = useNavigate()

    const priorityStyle = {
        low: "bg-green-500/10 text-green-400 border-green-500/20",
        medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        high: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return (
        <div
            className="rounded-sm border border-gray-800 bg-gray-950 p-2
                       hover:border-blue-900 transition"
        >
            <h4 className="text-base font-semibold text-white truncate">
                {task.title}
            </h4>

            {task.description && (
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                    {task.description}
                </p>
            )}
            

            <div className="mt-4 flex items-center justify-between gap-3">
                <span
                    className={`rounded-sm  px-2.5 py-1 text-xs font-medium capitalize
                    ${priorityStyle[task.priority]}`}
                >
                    {task.priority}
                </span>

                <span className="text-xs text-gray-400">
                    Due: {task.dueDate}
                </span>
            </div>


            <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-800 pt-2">
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/update-task/${task.id}`)
                    }}
                    className="rounded-sm px-3 py-1 text-xs font-medium
                               text-gray-400 hover:bg-blue-500/10
                               hover:text-blue-400 transition cursor-pointer"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="rounded-sm px-3 py-1 text-xs font-medium
                               text-gray-400 hover:bg-red-500/10
                               hover:text-red-400 transition cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
