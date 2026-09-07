import {api} from './common.js'





export async function deleteTask(taskId) {
    const response = await api.delete(`/tasks/${taskId}`)
    return response.data
    
}
