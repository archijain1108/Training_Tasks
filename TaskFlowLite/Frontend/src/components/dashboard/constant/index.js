

 const PRIORITY_OPTIONS = [
    {
        value: "low",
        label: "Low",
    },
    {
        value: "medium",
        label: "Medium",
    },
    {
        value: "high",
        label: "High",
    },
];

 const STATUS_OPTIONS = [
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "in-progress",
        label: "In Progress",
    },
    {
        value: "completed",
        label: "Completed",
    },
    
];


export const TASK_UPDATE_FIELDS = [
    { label: "Title", name: "title", type: "text", placeholder: "Title" },
    { label: "Description", name: "description", type: "text", placeholder: "Description" },
    { label: "Due Date", name: "dueDate", type: "date", placeholder: "Due Date" },
    { label: "Priority", name: "priority", type: "select", options: PRIORITY_OPTIONS, placeholder: "Priority" },
    { label: "Status", name: "status", type: "select", options: STATUS_OPTIONS, placeholder: "Status" },
];


export const Task_FIELDS = [
    { label: "Title", name: "title", type: "text", placeholder: "Title" },
    { label: "Description", name: "description", type: "text", placeholder: "Description" },
    { label: "Due Date", name: "dueDate", type: "date", placeholder: "Due Date" },
    { label: "Priority", name: "priority", type: "select", options: PRIORITY_OPTIONS, placeholder: "Priority" },
]