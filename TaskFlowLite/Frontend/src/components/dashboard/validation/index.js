import * as yup from 'yup'


export const createTaskSchema = yup.object({
    title: yup.string().required().min(3).max(20),
    description: yup.string().required().min(6).max(100),
    priority: yup.string().required('Select a priority'),
    dueDate: yup
    .date()
    .required("Due date is required")
    .test(
        "future-date",
        "Due date must be a future date",
        (value) => {
            if (!value) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dueDate = new Date(value);
            dueDate.setHours(0, 0, 0, 0);

            console.log(dueDate > today)

            return dueDate > today;
        }
    )
})


export const updateTaskSchema = yup.object({
    title: yup.string().min(3).max(20),
    description: yup.string().min(6).max(100),
    status: yup.string().required('Select a status'),
    priority: yup.string().required('Select a priority'),
    dueDate: yup
    .date()
    .required("Due date is required")
    .test(
        "future-date",
        "Due date must be a future date",
        (value) => {
            if (!value) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dueDate = new Date(value);
            dueDate.setHours(0, 0, 0, 0);

            return dueDate > today;
        }
    )


        
})