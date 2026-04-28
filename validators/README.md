# Validators 🛡️

Validators 🛡️

## Validators - Middleware Functions for Request Object Validation 🔍

Validators - Các hàm middleware để kiểm tra request object 🔍

### Purpose 🎯

Mục đích 🎯

The validators folder contains middleware functions responsible for validating incoming requests to ensure they meet the required criteria. This helps to prevent invalid or malicious data from being processed by the application.

Thư mục validators chứa các hàm middleware chịu trách nhiệm kiểm tra request đầu vào để bảo đảm chúng đáp ứng các tiêu chí cần thiết. Điều này giúp ngăn dữ liệu không hợp lệ hoặc có hại bị xử lý bởi ứng dụng.

### Structure 📂

Cấu trúc 📂

The folder contains a single file, `index.js`, which exports a middleware function called `validate`.

Thư mục này chứa một file duy nhất là `index.js`, file này export một middleware tên là `validate`.

### Content 📄

Nội dung 📄

- `index.js`: This file exports a middleware function called `validate`, which is responsible for checking for validation errors in incoming requests.
- `index.js`: File này export middleware `validate`, chịu trách nhiệm kiểm tra lỗi validation trong request đầu vào.

### Functionality ⚙️

Chức năng ⚙️

The `validate` middleware function performs the following tasks:

Middleware `validate` thực hiện các tác vụ sau:

- **Validation Error Checking**: It uses the `validationResult` function from `express-validator` to check for validation errors in the request.
- **Kiểm tra lỗi validation**: Middleware dùng hàm `validationResult` từ `express-validator` để kiểm tra lỗi validation trong request.
- **Error Extraction**: If errors are found, it extracts the error messages from the validation errors.
- **Trích xuất lỗi**: Nếu phát hiện lỗi, middleware sẽ lấy các thông báo lỗi từ kết quả validation.
- **Error Response**: It returns a `400` error response with the extracted error messages.
- **Phản hồi lỗi**: Middleware trả về response lỗi `400` kèm các thông báo lỗi đã được trích xuất.

### Implementation Details 🛠️

Chi tiết triển khai 🛠️

The `validate` middleware function is implemented using the following modules:

Middleware `validate` được triển khai bằng các module sau:

- `express-validator`: Provides the `validationResult` function for checking validation errors.
- `express-validator`: Cung cấp hàm `validationResult` để kiểm tra lỗi validation.
- `typedefs`: Provides type definitions for the application.
- `typedefs`: Cung cấp định nghĩa kiểu cho ứng dụng.
- `jsonTransformer`: Provides the `getNestedValuesString` function for extracting nested error messages.
- `jsonTransformer`: Cung cấp hàm `getNestedValuesString` để trích xuất các thông báo lỗi lồng nhau.

### Usage 🚀

Cách dùng 🚀

To use the `validate` middleware function, simply import it into your JavaScript file and add it to your Express.js route as a middleware function.

Để sử dụng middleware `validate`, bạn chỉ cần import nó vào file JavaScript của mình và thêm nó vào route Express.js như một middleware.
