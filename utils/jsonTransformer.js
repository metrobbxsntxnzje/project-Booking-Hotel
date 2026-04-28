/**
 * Joins all the values of a JSON object, including nested keys, into a single string 🌐
 * Ghép tất cả giá trị của object JSON, kể cả giá trị lồng nhau, thành một chuỗi 🌐
 *
 * @param {any} obj - The JSON object from which to extract values.
 * @param {any} obj - Object JSON dùng để trích xuất các giá trị.
 * @param {string} [delimiter=','] - The delimiter to use between values in the final string.
 * @param {string} [delimiter=','] - Ký tự phân tách dùng giữa các giá trị trong chuỗi kết quả.
 * @returns {string} - A string with all the values joined by the delimiter.
 * @returns {string} - Chuỗi gồm toàn bộ giá trị được nối với nhau bằng ký tự phân tách.
 */
const getNestedValuesString = (obj, delimiter = ',') => {
	// Initialize an empty array to collect values
	// Khởi tạo mảng rỗng để gom các giá trị
	let values = [];

	// Loop through each key-value pair in the object
	// Duyệt qua từng cặp key-value trong object
	for (const key in obj) {
		// Check if the value is a primitive type (not an object)
		// Kiểm tra xem value có phải kiểu nguyên thủy hay không, tức không phải object
		if (typeof obj[key] !== 'object') {
			// Add the value to the array
			// Thêm giá trị vào mảng
			values.push(obj[key]);
		} else {
			// If the value is an object, recursively get nested values
			// Nếu value là object thì lấy các giá trị lồng nhau bằng đệ quy
			values = values.concat(getNestedValuesString(obj[key], delimiter));
		}
	}

	// Join the values array into a single string using the provided delimiter
	// Ghép mảng values thành một chuỗi bằng ký tự phân tách đã truyền vào
	return values.join(delimiter);
};

// Export the function for use in other files
// Export hàm để dùng ở các file khác
module.exports = {
	getNestedValuesString,
};
