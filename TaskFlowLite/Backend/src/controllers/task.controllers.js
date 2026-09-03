import db from '../models/index.js';
const { Task } = db;

export const createTask = async (req, res, next) => {
    const { title, description, status, priority, dueDate } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            status,
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
        const taskID = req.params.id

        const task = await Task.findOne({
            where : {
                id : taskID,
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
        const taskId = req.params.id

        const task = await Task.findOne({
            where : {
                id : taskId,
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

    const taskId = req.params.id
    try{
        const task = await Task.findOne({
            where : {
                id : taskId,
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








