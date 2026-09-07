import { api } from './common.js'




export async function createTask({ title, description, priority, dueDate }) {

    const response = await api.post('/tasks', { title, description, priority, dueDate })
    return response.data
}


export const register = async ({ email, password, username }) => {
    const response = await api.post('/auth/register', { email, username, password })
    return response.data
}


export const login = async ({ email, password }) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data

}


export const logout = async () => {
    const response = await api.post('/auth/logout')
    return response.data
}