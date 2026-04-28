const typedefs = require('../typedefs'); // Import type definitions for request, response, and next functions
const logger = require('../utils/logger')(module); // Import a custom logger to keep track of events

// Get admin credentials from environment variables
// Lấy thông tin đăng nhập admin từ biến môi trường
// This keeps sensitive information like passwords secure
// Cách này giúp bảo vệ thông tin nhạy cảm như mật khẩu
const creds = JSON.parse(process.env.ADMIN_CREDS);

/**
 * Middleware to check admin access 🔐
 * Middleware dùng để kiểm tra quyền truy cập admin 🔐
 * @param {typedefs.Req} req - The request object from the client
 * @param {typedefs.Req} req - Đối tượng request gửi từ client
 * @param {typedefs.Res} res - The response object to send back to the client
 * @param {typedefs.Res} res - Đối tượng response dùng để trả về cho client
 * @param {typedefs.Next} next - The function to call the next middleware
 * @param {typedefs.Next} next - Hàm dùng để gọi middleware tiếp theo
 */
const adminQueryCreds = async (req, res, next) => {
	try {
		// Extract admin credentials from the query parameters of the request
		// Lấy thông tin đăng nhập admin từ query parameter của request
		const { user, access } = req.query;

		// Check if the provided credentials match the stored admin credentials
		// Kiểm tra xem thông tin cung cấp có khớp với thông tin admin đã lưu hay không
		if (creds[user] === access) {
			logger.info('Admin access granted for user: ' + user); // Log successful access
			next(); // Continue to the next middleware or route handler
		} else {
			// If credentials don't match, log the attempt and respond with a 401 Unauthorized status
			// Nếu thông tin không khớp, ghi log lần truy cập và trả về mã 401 Unauthorized
			const unauthIP = req.headers['x-real-ip'] || req.ip; // Get the IP address of the requester
			logger.warn('Unauthorized access attempt from IP: ' + unauthIP); // Log the warning
			return res
				.status(401)
				.send(
					'Unauthorized access. IP address: ' +
						unauthIP +
						'\nTruy cập không được phép. Địa chỉ IP: ' +
						unauthIP
				); // Send a 401 response
		}
	} catch (error) {
		// Handle any errors that occur during the process
		// Xử lý mọi lỗi phát sinh trong quá trình thực hiện
		logger.error('Error in adminQueryCreds middleware', { error });
		return res
			.status(500)
			.send('Server Error. Please try again later.\nLỗi máy chủ. Vui lòng thử lại sau.'); // Send a 500 response
	}
};

// Export the middleware function so it can be used in other parts of the application
// Export middleware để có thể dùng ở các phần khác của ứng dụng
module.exports = {
	adminQueryCreds,
};
