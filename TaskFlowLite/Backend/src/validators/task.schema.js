export const createTaskSchema = {
   type: 'object',

   properties : {
      'title' : {
            type : 'string',
            minlength : 3,
            maxlength : 100
      },
      description : {
            type : 'string',
            minlength : 6,
            maxlength : 100
       },

    status : {
        type : 'string',
        enum : ['pending' , 'in-progress' , 'completed']
    },

    priority : {
        type : 'string',
        enum : ['low' , 'medium' , 'high']
    },

    dueDate : {
        type : 'string',
        format : 'date'
    }
   },
   required : ['title' , 'description' , 'status' , 'priority' , 'dueDate'],
   additionalProperties : false

}


export const updateTaskSchema = {
    type : 'object',

    properties : {
        title : {
            type : 'string',
            minlength : 3,
            maxlength : 100
        },
        description : {
            type : 'string',
            minlength : 6,
            maxlength : 100
        },

        status : {
            type : 'string',
            enum : ['pending' , 'in-progress' , 'completed']
        },

        priority : {
            type : 'string',
            enum : ['low' , 'medium' , 'high']
        },

        dueDate : {
            type : 'string',
            format : 'date'
        }
    },
    additionalProperties : false,
    anyOf : [{required : ['title']} , {required : ['description']} , {required : ['status']} , {required : ['priority']} , {required : ['dueDate']}],

}
