// Import the validationResult function from express-validator, which helps us validate incoming requests.
// Import hàm validationResult từ express-validator để kiểm tra request đầu vào.
const { validationResult } = require('express-validator');

// Import the typedefs module, which contains type definitions for our application.
// Import module typedefs, nơi chứa các định nghĩa kiểu cho ứng dụng.
const typedefs = require('../typedefs');

// Import the getNestedValuesString function from the jsonTransformer module, which helps us extract nested values from objects.
// Import hàm getNestedValuesString từ module jsonTransformer để trích xuất giá trị lồng nhau từ object.
const { getNestedValuesString } = require('../utils/jsonTransformer');

/**
 * Refer: https://stackoverflow.com/questions/58848625/access-messages-in-express-validator
 *
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 * @param {typedefs.Next} next
 */
// Define a middleware function called validate, which checks for validation errors in the request.
// Định nghĩa middleware validate dùng để kiểm tra lỗi validation trong request.
const validate = (req, res, next) => {
	// Get the validation errors from the request using the validationResult function.
	// Lấy các lỗi validation từ request bằng hàm validationResult.
	const errors = validationResult(req);

	// If there are no errors, call the next middleware function in the chain.
	// Nếu không có lỗi, gọi middleware tiếp theo trong chuỗi xử lý.
	if (errors.isEmpty()) {
		return next();
	}

	// Initialize an empty array to store the extracted error messages.
	// Khởi tạo mảng rỗng để lưu các thông báo lỗi đã trích xuất.
	const extractedErrors = [];

	// Loop through each error in the errors array.
	// Duyệt qua từng lỗi trong mảng errors.
	errors.array().forEach((err) => {
		// If the error is of type 'alternative', it means there are nested errors.
		// Nếu lỗi có kiểu 'alternative' thì nghĩa là có các lỗi lồng nhau.
		if (err.type === 'alternative') {
			// Loop through each nested error and extract the error message.
			// Duyệt từng lỗi lồng nhau và lấy thông báo lỗi.
			err.nestedErrors.forEach((nestedErr) => {
				extractedErrors.push({
					// Use the path of the nested error as the key and the error message as the value.
					// Dùng path của lỗi lồng nhau làm key và thông báo lỗi làm value.
					[nestedErr.path]: nestedErr.msg,
				});
			});
		}
		// If the error is of type 'field', it means there is a single error message.
		// Nếu lỗi có kiểu 'field' thì nghĩa là có một thông báo lỗi đơn lẻ.
		else if (err.type === 'field') {
			extractedErrors.push({
				// Use the path of the error as the key and the error message as the value.
				// Dùng path của lỗi làm key và thông báo lỗi làm value.
				[err.path]: err.msg,
			});
		}
	});

	// Return a 400 error response with the extracted error messages.
	// Trả về response lỗi 400 kèm các thông báo lỗi đã trích xuất.
	return res.status(400).send({
		// Use the getNestedValuesString function to extract the nested error messages as a string.
		// Dùng hàm getNestedValuesString để gom các thông báo lỗi lồng nhau thành chuỗi.
		message: getNestedValuesString(extractedErrors),
		// Include the extracted error messages in the response.
		// Đính kèm các thông báo lỗi đã trích xuất trong response.
		errors: extractedErrors,
	});
};

// Export the validate middleware function.
// Export middleware validate để dùng ở nơi khác.
module.exports = {
	validate,
};
