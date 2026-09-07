import Ajv from "ajv";
import addFormats from "ajv-formats";


const ajv = new Ajv({
    allErrors : true
})

addFormats(ajv)


ajv.addKeyword({
  keyword: 'futureDate',
  type: 'string',
  validate: (schema, data) => {
    if (!schema) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(data);

    return dueDate > today;
  }
});




export default ajv