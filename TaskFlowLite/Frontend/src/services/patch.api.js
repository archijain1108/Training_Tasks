import { api } from "./common";





export async function updateTaskStatus({status , taskId}) {
    const response = await api.patch(`/tasks/${taskId}/status`, {status})
    return response.data

}


export async function updateTask(taskId , updatedData) {
    const response = await api.patch(`/tasks/${taskId}` , updatedData)
    return response.data
       
}