/**
 * Recursively builds a FormData object from a JSON object 🌳
 * Xây dựng đối tượng FormData từ object JSON theo cách đệ quy 🌳
 *
 * @param {FormData} formData - The FormData object to build. This is the container where data will be added.
 * @param {FormData} formData - Đối tượng FormData cần được xây dựng. Đây là nơi dữ liệu sẽ được thêm vào.
 * @param {object} data - The JSON object to convert. This is the source data that we want to put into FormData.
 * @param {object} data - Object JSON cần chuyển đổi. Đây là dữ liệu nguồn mà chúng ta muốn đưa vào FormData.
 * @param {string} [parentKey] - The parent key for nested objects. Helps in creating nested FormData keys.
 * @param {string} [parentKey] - Khóa cha cho các object lồng nhau. Nó giúp tạo key lồng nhau trong FormData.
 */
function buildFormData(formData, data, parentKey) {
	// Check if the data is an object (but not a Date)
	// Kiểm tra xem dữ liệu có phải object hay không, ngoại trừ kiểu Date
	if (data && typeof data === 'object' && !(data instanceof Date)) {
		// Loop through each key-value pair in the object
		// Duyệt qua từng cặp key-value trong object
		Object.keys(data).forEach((key) => {
			// Recursively call buildFormData for nested objects
			// Gọi đệ quy buildFormData cho các object lồng nhau
			// Construct the key in the FormData object with brackets for nesting
			// Tạo key trong FormData bằng cú pháp ngoặc vuông để biểu diễn lồng nhau
			buildFormData(
				formData,
				data[key],
				parentKey ? `${parentKey}[${key}]` : key
			);
		});
	} else {
		// If data is not an object, add it to the FormData object
		// Nếu dữ liệu không phải object thì thêm trực tiếp vào FormData
		const value = data == null ? '' : data; // Convert null values to an empty string
		formData.append(parentKey, value); // Add the value to FormData with the current key
	}
}

/**
 * Converts a JSON object to a FormData object 📄
 * Chuyển object JSON thành FormData 📄
 *
 * @param {object} data - The JSON object to convert.
 * @param {object} data - Object JSON cần chuyển đổi.
 * @returns {FormData} - The converted FormData object.
 * @returns {FormData} - Đối tượng FormData sau khi chuyển đổi.
 */
function jsonToFormData(data) {
	// Create a new FormData object
	// Tạo đối tượng FormData mới
	const formData = new FormData();

	// Populate the FormData object using buildFormData
	// Điền dữ liệu vào FormData bằng hàm buildFormData
	buildFormData(formData, data);

	// Return the populated FormData object
	// Trả về đối tượng FormData đã được điền dữ liệu
	return formData;
}

// Export the functions so they can be used in other files
// Export các hàm để có thể dùng ở những file khác
module.exports = {
	jsonToFormData,
	buildFormData,
};
