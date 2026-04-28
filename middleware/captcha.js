const fetch = require('cross-fetch'); // Import cross-fetch to make HTTP requests

const typedefs = require('../typedefs'); // Import type definitions for request, response, and next functions
const logger = require('../utils/logger')(module); // Import a custom logger to keep track of events

/**
 * Middleware to verify Google ReCAPTCHA v2 🤖
 * Middleware dùng để xác minh Google ReCAPTCHA v2 🤖
 *
 * @param {typedefs.Req} req - The request object from the client
 * @param {typedefs.Req} req - Đối tượng request gửi từ client
 * @param {typedefs.Res} res - The response object to send back to the client
 * @param {typedefs.Res} res - Đối tượng response dùng để trả về cho client
 * @param {typedefs.Next} next - The function to call the next middleware
 * @param {typedefs.Next} next - Hàm dùng để gọi middleware tiếp theo
 */
const verifyCaptcha = async (req, res, next) => {
	try {
		const secretKey = process.env.CAPTCHA_SECRET; // Get the ReCAPTCHA secret key from environment variables

		// Create the URL for the ReCAPTCHA verification API
		// Tạo URL cho API xác minh ReCAPTCHA
		const verifyCaptchaURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

		// Send a request to the ReCAPTCHA API to verify the user's response
		// Gửi request tới API ReCAPTCHA để xác minh phản hồi của người dùng
		const captchaResp = await fetch(verifyCaptchaURL);

		// Convert the API response to JSON format
		// Chuyển phản hồi từ API sang định dạng JSON
		const captchaData = await captchaResp.json();

		// Check if the ReCAPTCHA verification failed
		// Kiểm tra xem việc xác minh ReCAPTCHA có thất bại hay không
		if (captchaData.success !== undefined && !captchaData.success) {
			logger.error('ReCAPTCHA verification failed', { captchaData });
			return res
				.status(403)
				.send(
					'Failed ReCAPTCHA verification.\nXác minh ReCAPTCHA thất bại.'
				); // Send a 403 Forbidden response
		}

		// If the ReCAPTCHA verification is successful, proceed to the next middleware or route handler
		// Nếu xác minh ReCAPTCHA thành công, chuyển sang middleware hoặc route handler tiếp theo
		next();
	} catch (error) {
		// Handle any errors that occur during the process
		// Xử lý mọi lỗi phát sinh trong quá trình thực hiện
		logger.error('Error in verifyCaptcha middleware', { error });
		return res
			.status(500)
			.send('Server Error. Please try again later.\nLỗi máy chủ. Vui lòng thử lại sau.'); // Send a 500 response
	}
};

// Export the middleware function so it can be used in other parts of the application
// Export middleware để có thể dùng ở các phần khác của ứng dụng
module.exports = {
	verifyCaptcha,
};
