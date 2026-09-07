
export const createTaskSchema = {
   type: 'object',

   properties : {
      'title' : {
            type : 'string',
            minLength : 3,
            maxLength : 100
      },
      description : {
            type : 'string',
            minLength : 6,
            maxLength : 100
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
        format : 'date',
        futureDate : true
    }
   },
   required : ['title' , 'description' , 'dueDate'],

}


export const updateTaskSchema = {
    type : 'object',

    properties : {
        title : {
            type : 'string',
            minLength : 3,
            maxLength : 100
        },
        description : {
            type : 'string',
            minLength : 6,
            maxLength : 100
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
            format : 'date',
            futureDate : true
        }
    },
    additionalProperties : false,
    anyOf : [{required : ['title']} , {required : ['description']} , {required : ['status']} , {required : ['priority']} , {required : ['dueDate']}],

}
