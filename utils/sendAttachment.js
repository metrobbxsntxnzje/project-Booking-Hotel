// Import the typedefs module for type definitions 📄
// Import module typedefs để dùng định nghĩa kiểu 📄
const typedefs = require('../typedefs');

// Import the fast-csv module for working with CSV data 📊
// Import module fast-csv để làm việc với dữ liệu CSV 📊
const fastCSV = require('fast-csv');

// Import the stream module for handling streams in Node.js 🧵
// Import module stream để xử lý luồng dữ liệu trong Node.js 🧵
const stream = require('stream');

/**
 * Sends data formatted as a CSV file in the response
 * Gửi dữ liệu dưới dạng tệp CSV trong response
 *
 * @param {typedefs.Res} res - Express response object
 * @param {typedefs.Res} res - Đối tượng response của Express
 * @param {string} filename - Filename for the attachment (preferably with a timestamp)
 * @param {string} filename - Tên tệp đính kèm, nên kèm dấu thời gian nếu có
 * @param {any[]} data - Data from database queries (excluding metadata)
 * @param {any[]} data - Dữ liệu lấy từ truy vấn cơ sở dữ liệu, không bao gồm metadata
 */
const sendCSV = async (res, filename, data) => {
	// Convert data to a CSV buffer with headers
	// Chuyển dữ liệu thành buffer CSV có kèm header
	const csvData = await fastCSV.writeToBuffer(data, { headers: true });

	// Create a PassThrough stream to send data to the response
	// Tạo PassThrough stream để gửi dữ liệu tới response
	const fileStream = new stream.PassThrough();
	fileStream.end(csvData);

	// Set up the response to send the file
	// Thiết lập response để gửi tệp
	res.attachment(filename + '.csv'); // Set the filename
	res.type('text/csv'); // Set the content type to CSV

	// Send the CSV data to the client
	// Gửi dữ liệu CSV về client
	fileStream.pipe(res);

	return;
};

// Export the sendCSV function for use in other files
// Export hàm sendCSV để dùng ở các file khác
module.exports = {
	sendCSV,
};
