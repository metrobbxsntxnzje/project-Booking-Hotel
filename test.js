require('dotenv').config();
const { Sequelize } = require('sequelize');
require('./models'); // 🔥 QUAN TRỌNG: load models trước


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);



const db = require('./models');

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Kết nối thành công');

    await db.sequelize.sync({ alter: true }); // 🔥 CÓ MODEL MỚI TẠO TABLE

    console.log('✅ Tất cả bảng đã được tạo');
  } catch (err) {
    console.error(err);
  }
})();