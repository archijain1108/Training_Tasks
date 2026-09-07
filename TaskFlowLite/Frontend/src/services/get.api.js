import {api} from './common.js' 



export const getMe = async () => {
    const response = await api.get('/auth/getMe')
    return response.data 
}



export async function getTasks() {
    const response = await api.get('/tasks')
    return response.data
    
} 


export async function getTaskById(taskId) {
    const response = await api.get(`/tasks/${taskId}`)
    return response.data 
    
}
