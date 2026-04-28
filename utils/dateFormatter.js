/**
 * Generate a timestamp string for filenames
 * Tạo chuỗi thời gian để dùng trong tên tệp
 *
 * @returns {string} - A string with the current date and time in the format YYYY.MM.DD-HH:MM:SS
 * @returns {string} - Chuỗi ngày giờ hiện tại theo định dạng YYYY.MM.DD-HH:MM:SS
 */
const dateForFilename = () => {
	// Create a new Date object to get the current date and time
	// Tạo đối tượng Date mới để lấy ngày giờ hiện tại
	const dt = new Date();

	// Construct a string with the current date and time
	// Tạo chuỗi chứa ngày giờ hiện tại
	// Format: YYYY.MM.DD-HH:MM:SS
	// Định dạng: YYYY.MM.DD-HH:MM:SS
	return `${dt.getFullYear()}-${
		dt.getMonth() + 1
	}-${dt.getDate()}-${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`;
};

// Export the dateForFilename function to be used in other files
// Export hàm dateForFilename để dùng ở các file khác
module.exports = {
	dateForFilename,
};
