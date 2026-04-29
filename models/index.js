'use strict';
require('dotenv').config();
const fs = require('fs'); // Import the file system module to read files
const path = require('path'); // Import the path module to handle file paths
const Sequelize = require('sequelize'); // Import Sequelize to work with the database
const logger = require('../utils/logger')(module); // Import a custom logger to track events

const basename = path.basename(__filename); // Get the current file name (index.js)
const env = process.env.NODE_ENV || 'development'; // Set the environment (default to 'development')
const config = require(__dirname + '/../config/sequelize.js')[env]; // Load the Sequelize configuration for the current environment

const db = {}; // Create an empty object to store our database models

// Create a new Sequelize instance based on the environment configuration
// Tạo một Sequelize instance mới dựa trên cấu hình của môi trường hiện tại
let sequelize;
if (config.use_env_variable) {
	// If using an environment variable for the database URL
	// Nếu dùng biến môi trường cho URL kết nối cơ sở dữ liệu
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	// Otherwise, use the configuration object directly
	// Nếu không, dùng trực tiếp object cấu hình
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

// Authenticate with the database to ensure the connection is successful
// Xác thực với cơ sở dữ liệu để bảo đảm kết nối thành công
sequelize.authenticate()
  .then(() => logger.info('Sequelize authentication successful'))
  .catch((err) => logger.error('Sequelize authentication error', { err }));

// Read and initialize model definitions from the current directory
// Đọc và khởi tạo các định nghĩa model từ thư mục hiện tại
fs.readdirSync(__dirname) // Read the files in the current directory
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		); // Exclude non-JS files and this file (index.js)
	})
	.forEach((file) => {
		// Import and initialize each model file
		// Import và khởi tạo từng file model
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model; // Add the model to the db object
	});

// Set up associations (relationships) between models
// Thiết lập association (mối quan hệ) giữa các model
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db); // Call the associate method on each model
	}
});

// Add the Sequelize instance and the Sequelize library to the db object
// Thêm Sequelize instance và thư viện Sequelize vào object db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object so it can be used in other parts of the application
// Export object db để dùng ở các phần khác của ứng dụng
module.exports = db;
