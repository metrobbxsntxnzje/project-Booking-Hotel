// Import nodemailer for sending emails
// Import nodemailer để gửi email
const mailer = require('nodemailer');

// Import the custom logger for logging email activities
// Import logger tùy chỉnh để ghi log hoạt động gửi email
const logger = require('./logger')(module);

// Create a transporter for sending emails via Gmail
// Tạo transporter để gửi email qua Gmail
const transport = mailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // Use SSL/TLS
	service: 'gmail',
	auth: {
		user: process.env.AUTOMAILER_ID, // Email address
		pass: process.env.AUTOMAILER_APP_PASSWD, // Email password
	},
});

/**
 * Sends an email from a web user to an organization email 📨
 * Gửi email từ người dùng web tới email của tổ chức 📨
 *
 * @param {string} mailTarget - Target email address (must be within the organization)
 * @param {string} mailTarget - Địa chỉ email đích, phải thuộc tổ chức
 * @param {string} mailSubject - Subject of the email
 * @param {string} mailSubject - Tiêu đề của email
 * @param {{name: string, email: string, message: string}} userData - User details: name, email, and message
 * @param {{name: string, email: string, message: string}} userData - Thông tin người dùng: tên, email và nội dung tin nhắn
 */
const inboundMailer = (mailTarget, mailSubject, userData) => {
	// Check if the target email address is valid for the organization
	// Kiểm tra xem email đích có hợp lệ cho tổ chức hay không
	if (!mailTarget.endsWith('cegtechforum.in')) {
		throw new Error(
			'Invalid target mail domain.\nTên miền email đích không hợp lệ.'
		); // Throw an error if not valid
	}

	// Construct the email message
	// Tạo nội dung email
	const message = {
		to: mailTarget,
		subject: mailSubject,
		html: `<p>Name: ${userData.name}</p><p>Tên: ${userData.name}</p><p>Email: ${userData.email}</p><br/><p>Message:<br/>${userData.message}</p><p>Tin nhắn:<br/>${userData.message}</p>`,
	};

	// Send the email using the transporter
	// Gửi email bằng transporter
	transport.sendMail(message, (err, info) => {
		if (err) {
			// Log an error if the email fails to send
			// Ghi log lỗi nếu gửi email thất bại
			logger.error('Failure: QUERY mail NOT sent', { err, userData });
		} else {
			// Log success if the email is sent
			// Ghi log thành công nếu email đã được gửi
			logger.info('Success: QUERY mail sent', { info });
		}
	});
};

// Export the inboundMailer function for use in other files
// Export hàm inboundMailer để dùng ở các file khác
module.exports = {
	inboundMailer,
};
