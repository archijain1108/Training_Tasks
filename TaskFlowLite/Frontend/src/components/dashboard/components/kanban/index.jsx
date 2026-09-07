import { useEffect } from "react";
import TaskCard from '../taskCard'
import {useTask} from '../../hook/useTasks'
import {useContext} from 'react'
import { TaskContext } from '../../../../store/TaskContext';
import Loading from "../../../../common/loading";

const Kanban = () => {
    const {handleDeleteTask , handleGetAllTasks} = useTask()
    const {tasks ,loading} = useContext(TaskContext)


    useEffect(() => {
        handleGetAllTasks()
    }, [])


    const columns = [
        {
            title: "Pending",
        },
        {
            title: "In-progress",
        },
        {
            title: "Completed",
        },
    ];


    if(loading){
        return <Loading />
    }

    return (
    <> 
        <section className=" h-full p-2 flex flex-col">
            <div className="p-2">
                <h2 className="text-xl text-center sm:text-xl font-semibold text-blue-500">
                    Your Tasks
                </h2>

                <p className="mt-1 text-center text-sm text-gray-400">
                    Stay organized and keep track of your work
                </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                {columns.map((column , idx) => (
                    <div
                        key={idx}
                        className="min-h-full rounded-xl border border-blue-900/50
                                   bg-gray-900 p-4"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-white">
                                {column.title}
                            </h3>

                            <span
                                className="flex h-7 min-w-7 items-center justify-center
                                           rounded-full bg-blue-600/15 px-2
                                           text-xs font-medium text-blue-400"
                            >
                                {tasks?.filter(task => task.status === column.title.toLowerCase()).length || 0} 
                            </span>
                        </div>

                        <div className="space-y-2">
                          {
                           
                            tasks?.length > 0 ? 

                            tasks.filter((task) => task.status === column.title.toLowerCase()).map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    handleDeleteTask={handleDeleteTask}
                                />
                            )) : 
                            <p className="text-sm text-gray-500">
                                No tasks found
                            </p>
                          }
                        </div>
                    </div>
                ))}
            </div>
        </section>


        </>
    );
};

export default Kanban;