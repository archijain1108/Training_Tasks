
const bcrypt = require('bcryptjs')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD , 10)

    return queryInterface.bulkInsert('users', [
      {
        fullname: 'Admin',
        role: 'admin',
        email: process.env.ADMIN_EMAIL,
        contact: process.env.ADMIN_CONTACT,
        password ,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      email : process.env.ADMIN_EMAIL
    });
  },
};