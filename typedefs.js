// Type Definitions for Better Code Completion and IntelliSense
// Định nghĩa kiểu để hỗ trợ tự động gợi ý mã và IntelliSense tốt hơn

// Importing the 'module' type definition to help understand the module structure.
// Import định nghĩa kiểu 'module' để giúp hiểu cấu trúc module.
/**
 * @typedef {import("module")} Module
 */

// Importing Express.js type definitions to handle request, response, and next functions.
// Import định nghĩa kiểu của Express.js để xử lý request, response và next function.
/**
 * @typedef {import("express").Request} Req
 * Represents an Express.js request object used to handle incoming requests.
 * Đại diện cho request object của Express.js dùng để xử lý request đi vào.
 */

/**
 * @typedef {import("express").Response} Res
 * Represents an Express.js response object used to send responses to the client.
 * Đại diện cho response object của Express.js dùng để gửi phản hồi về client.
 */

/**
 * @typedef {import("express").NextFunction} Next
 * Represents an Express.js function used to pass control to the next middleware.
 * Đại diện cho hàm của Express.js dùng để chuyển quyền xử lý sang middleware tiếp theo.
 */

// Importing Sequelize type definitions for working with Sequelize ORM.
// Import định nghĩa kiểu của Sequelize để làm việc với Sequelize ORM.
/**
 * @typedef {import("sequelize")} Sequelize
 * Represents a Sequelize instance used to interact with the database.
 * Đại diện cho một Sequelize instance dùng để tương tác với cơ sở dữ liệu.
 */

/**
 * @typedef {import("sequelize").Model} Model
 * Represents a Sequelize model which defines the structure of a database table.
 * Đại diện cho một Sequelize model dùng để định nghĩa cấu trúc của bảng dữ liệu.
 */

/**
 * @typedef {import("sequelize").QueryInterface} QueryInterface
 * Represents a Sequelize interface for querying the database.
 * Đại diện cho giao diện Sequelize dùng để truy vấn cơ sở dữ liệu.
 */

// Importing Winston type definitions for logging purposes.
// Import định nghĩa kiểu của Winston phục vụ mục đích ghi log.
/**
 * @typedef {import("winston").Logger} Logger
 * Represents a Winston logger used for logging messages and errors.
 * Đại diện cho logger của Winston dùng để ghi log thông báo và lỗi.
 */

// Placeholder to ensure the file is treated as a module.
// Dòng giữ chỗ để bảo đảm tệp này được xem như một module.
exports.unused = {};
