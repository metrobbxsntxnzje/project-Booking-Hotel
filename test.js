require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công');
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
})();