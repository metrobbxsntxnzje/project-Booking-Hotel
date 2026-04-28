// Import the path library for handling file paths 🔗
// Import thư viện path để xử lý đường dẫn tệp 🔗
const pathLib = require('path');

// Import the qrcode library to generate QR codes 📱
// Import thư viện qrcode để tạo mã QR 📱
const qr = require('qrcode');

// Import the logger module for logging errors and info 📜
// Import module logger để ghi log lỗi và thông tin 📜
const logger = require('./logger')(module);

// Import the function for signing data with a JSON Web Token (JWT) 🔐
// Import hàm ký dữ liệu bằng JSON Web Token (JWT) 🔐
const { getSignedJWT } = require('./token');

/**
 * Generates a QR code from data and saves it to a file in the tmp folder 🗂️
 * Tạo mã QR từ dữ liệu và lưu thành tệp trong thư mục tmp 🗂️
 *
 * @param {string} id - Unique identifier for the file name
 * @param {string} id - Định danh duy nhất cho tên tệp
 * @param {string|object} data - Data to encode in the QR code (string or JSON object)
 * @param {string|object} data - Dữ liệu cần mã hóa vào QR (chuỗi hoặc object JSON)
 */
const qrPNGFile = (id, data) => {
	// Generate the QR code and save it as a PNG file
	// Tạo mã QR và lưu dưới dạng tệp PNG
	qr.toFile(
		pathLib.join(__dirname, '../tmp/tmpQR-' + id + '.png'), // File path
		typeof data === 'object' ? JSON.stringify(data) : data, // Data to encode
		{ type: 'png' }, // File format
		(err) => {
			if (err) {
				// Log error if QR code generation fails
				// Ghi log lỗi nếu quá trình tạo QR thất bại
				logger.error('qrPNGFile', err);
				throw err;
			}
		}
	);
};

/**
 * Generates a QR code from signed data and saves it to a file 🗂️
 * Tạo mã QR từ dữ liệu đã ký và lưu ra tệp 🗂️
 *
 * @param {string} id - Unique identifier for the file name
 * @param {string} id - Định danh duy nhất cho tên tệp
 * @param {string|object} data - Data to encode in the QR code (string or JSON object)
 * @param {string|object} data - Dữ liệu cần mã hóa vào QR (chuỗi hoặc object JSON)
 * @param {boolean} tmp - If true, save in tmp folder; otherwise, save in uploads/2023/k-qrs folder
 * @param {boolean} tmp - Nếu là true thì lưu ở thư mục tmp, ngược lại lưu ở uploads/2023/k-qrs
 * @returns {string} - Filename of the saved QR code
 * @returns {string} - Tên tệp QR đã lưu
 */
const qrSignedPNGFile = (id, data, tmp = true) => {
	// Sign the data with JWT
	// Ký dữ liệu bằng JWT
	const signedData = getSignedJWT(data);

	// Construct the filename and target path
	// Tạo tên tệp và đường dẫn đích
	const qrFilename = `${tmp ? 'tmpEncQR' : 'K-QR'}-${id}.png`;
	const targetPath = pathLib.join(
		__dirname,
		'..',
		tmp ? 'tmp' : pathLib.join('uploads', '2023', 'k-qrs'),
		qrFilename
	);

	// Generate the QR code and save it to the specified path
	// Tạo mã QR và lưu vào đường dẫn đã chỉ định
	qr.toFile(
		targetPath,
		typeof data === 'object' ? JSON.stringify(signedData) : signedData,
		{ type: 'png' },
		(err) => {
			if (err) {
				// Log error if QR code generation fails
				// Ghi log lỗi nếu quá trình tạo QR thất bại
				logger.error('qrSignedPNGFile', err);
				throw err;
			}
		}
	);

	// Return the filename
	// Trả về tên tệp
	return qrFilename;
};

// Export the functions for use in other modules
// Export các hàm để dùng ở module khác
module.exports = {
	qrPNGFile,
	qrSignedPNGFile,
};
