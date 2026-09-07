import db from '../models/index.js';
const { Task } = db;

export const createTask = async (req, res, next) => {
    const { title, description, priority, dueDate } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            userId: req.user.id
        })


        res.status(201).json({
            message: 'Task created successfully',
            task
        })

    }
    catch(err){
        next(err)
    }


}


export const getAllTasks = async (req, res, next) => {

    try{

        const tasks = await Task.findAll({
            where : {
                userId : req.user.id
            }
        })
        res.status(200).json({
            message : 'Tasks fetched successfully',
            tasks : tasks || []
        })

    }
    catch(err){
        next(err)
    }
}


// use filter to get tasks based on title starting with a specific string
export const getFilteredTasks = async (req, res, next) => {
    try{
        const {title} = req.query

        const tasks = await Task.findAll({
            where : {
                userId : req.user.id,
                title : {
                    [db.Sequelize.Op.startsWith] : title
                }
            }
        })

        res.status(200).json({
            message : 'fetched filtered tasks successfully',
            tasks : tasks || []
        })
        
    }catch(err){
        next(err)
    }

  }




export const getTaskById = async (req, res, next) => {

    try{

        const task = await Task.findOne({
            where : {
                id : req.params.taskId,
                userId : req.user.id
            }
        })

        if(! task ){
            res.status(404)
            .json({
                message : "task not found"
            })
        }

        res.status(200).json({
            message : 'Task fetched successfully',
            task
        })


    }
    catch(err){
        next(err)
    }
}


export const updateTask = async (req, res, next) => {
    try{
       

        const task = await Task.findOne({
            where : {
                id : req.params.taskId,
                userId : req.user.id
            }
        })

        if(!task){
            res.status(404).json({
                message : "task not found"
            })
        }

        const { title, description, status, priority, dueDate } = req.body

        task.title = title || task.title
        task.description = description || task.description
        task.status = status || task.status
        task.priority = priority || task.priority
        task.dueDate = dueDate || task.dueDate

         await task.save()

         res.status(200).json({
            message : 'Task updated successfully',
            task
         })
        }
        catch(err){
        next(err)
    }

}


export const deleteTask = async (req, res, next) => {

    try{
        const task = await Task.findOne({
            where : {
                id : req.params.taskId,
                userId : req.user.id
            }
        })

        if(!task){
            res.status(404).json({
                message : "task not found"
            })
        }

        task.destroy()
 
        res.status(200).json({
            message : 'Task deleted successfully'
        })
    }
    catch(err){
        next(err)
    }
}


export const updateTaskStatus = async ( req , res , next) => {
    try{
        const id = req.params.taskId
        const {status} = req.body

        const task = await Task.findOne({
            where : {
                id ,
                userId : req.user.id
            }
        })

        if(!task){
            return res.status(400)
            .json({
                message : 'task not found'
            })
        }

        task.status = status
        await task.save();


        return res.status(200)
        .json({
            message : 'task status updated successfully',
            updatedStatus : task.status
        })


    }
    catch(err){
        next(err)
    }
}






