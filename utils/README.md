# Utilities 🛠️

Tiện ích dùng chung 🛠️

## What are Utilities? 🤔

Utilities là gì? 🤔

Utilities are helper functions and modules that perform common tasks across your application. They help with various operations that are not directly related to API routes but are essential for the overall functionality of your app.

Utilities là các hàm và module hỗ trợ dùng để thực hiện những tác vụ phổ biến trong toàn bộ ứng dụng. Chúng xử lý nhiều thao tác không trực tiếp thuộc về API route nhưng vẫn rất cần thiết cho hoạt động tổng thể của ứng dụng.

### Purpose 🎯

Mục đích 🎯

The `utils` folder contains reusable code for:

Thư mục `utils` chứa mã nguồn có thể tái sử dụng cho:

- **File Handling:** Archiving files and directories.
- **Xử lý tệp:** Nén tệp và thư mục.
- **Date Operations:** Formatting dates and timestamps.
- **Xử lý ngày giờ:** Định dạng ngày tháng và dấu thời gian.
- **Form Handling:** Building and manipulating form data.
- **Xử lý form:** Tạo và thao tác với dữ liệu form.
- **JSON Operations:** Transforming and working with JSON data.
- **Xử lý JSON:** Chuyển đổi và làm việc với dữ liệu JSON.
- **Logging:** Recording messages and errors.
- **Ghi log:** Ghi lại thông báo và lỗi.
- **Mailing:** Sending emails.
- **Gửi mail:** Gửi email.
- **QR Codes:** Generating QR codes.
- **Mã QR:** Tạo mã QR.
- **Encryption:** Securing data with encryption.
- **Mã hóa:** Bảo vệ dữ liệu bằng mã hóa.
- **Token Management:** Handling JSON Web Tokens (JWTs).
- **Quản lý token:** Làm việc với JSON Web Token (JWT).

### Structure 🗂️

Cấu trúc 🗂️

The folder contains the following files:

Thư mục này chứa các file sau:

- **`archiver.js`**: For archiving files and directories.
- **`archiver.js`**: Dùng để nén tệp và thư mục.
- **`dateFormatter.js`**: For formatting dates and timestamps.
- **`dateFormatter.js`**: Dùng để định dạng ngày tháng và thời gian.
- **`formData.js`**: For building and manipulating form data.
- **`formData.js`**: Dùng để tạo và thao tác dữ liệu form.
- **`jsonTransformer.js`**: For transforming JSON data.
- **`jsonTransformer.js`**: Dùng để biến đổi dữ liệu JSON.
- **`logger.js`**: For logging messages and errors.
- **`logger.js`**: Dùng để ghi log thông báo và lỗi.
- **`mailer.js`**: For sending emails.
- **`mailer.js`**: Dùng để gửi email.
- **`qrGenerator.js`**: For generating QR codes.
- **`qrGenerator.js`**: Dùng để tạo mã QR.
- **`quickEncrypt.js`**: For encrypting and decrypting data.
- **`quickEncrypt.js`**: Dùng để mã hóa và giải mã dữ liệu.
- **`sendAttachment.js`**: For sending attachments like CSV files.
- **`sendAttachment.js`**: Dùng để gửi tệp đính kèm như CSV.
- **`token.js`**: For generating and verifying JWTs.
- **`token.js`**: Dùng để tạo và xác thực JWT.

### Modules and Functions 📚

Các module và hàm 📚

**Archiver**:

**Archiver**:

- `zipDirectory`: Compresses a directory into a ZIP file.
- `zipDirectory`: Nén một thư mục thành tệp ZIP.

**Date Formatter**:

**Date Formatter**:

- `dateForFilename`: Creates a date string in the format YYYY-MM-DD-HH-MM-SS for filenames.
- `dateForFilename`: Tạo chuỗi ngày theo định dạng YYYY-MM-DD-HH-MM-SS để dùng trong tên tệp.

**Form Data**:

**Form Data**:

- `buildFormData`: Creates a FormData object from a JavaScript object.
- `buildFormData`: Tạo đối tượng FormData từ một object JavaScript.
- `jsonToFormData`: Converts a JSON object to a FormData object.
- `jsonToFormData`: Chuyển một object JSON thành FormData.

**JSON Transformer**:

**JSON Transformer**:

- `getNestedValuesString`: Extracts nested values from a JSON object as a string.
- `getNestedValuesString`: Trích xuất các giá trị lồng nhau từ object JSON thành chuỗi.

**Logger**:

**Logger**:

- `logger`: Provides logging functionality for messages and errors.
- `logger`: Cung cấp chức năng ghi log cho thông báo và lỗi.

**Mailer**:

**Mailer**:

- `inboundMailer`: Sends an email with a template and attachments.
- `inboundMailer`: Gửi email với mẫu nội dung và tệp đính kèm.

**QR Generator**:

**QR Generator**:

- `qrPNGFile`: Generates a QR code as a PNG file.
- `qrPNGFile`: Tạo mã QR dưới dạng tệp PNG.
- `qrSignedPNGFile`: Generates a signed QR code as a PNG file.
- `qrSignedPNGFile`: Tạo mã QR đã ký dưới dạng tệp PNG.

**Quick Encrypt**:

**Quick Encrypt**:

- `generate`: Creates a public-private key pair.
- `generate`: Tạo cặp khóa public-private.
- `encrypt`: Encrypts a string using a public key.
- `encrypt`: Mã hóa chuỗi bằng khóa public.
- `decrypt`: Decrypts a string using a private key.
- `decrypt`: Giải mã chuỗi bằng khóa private.

**Send Attachment**:

**Send Attachment**:

- `sendCSV`: Sends a CSV file as an email attachment.
- `sendCSV`: Gửi tệp CSV dưới dạng tệp đính kèm.

**Token**:

**Token**:

- `getJWT`: Generates a JSON Web Token (JWT) from data.
- `getJWT`: Tạo JSON Web Token (JWT) từ dữ liệu.
- `verifyJWT`: Checks if a JWT is valid.
- `verifyJWT`: Kiểm tra JWT có hợp lệ hay không.
- `getSignedJWT`: Generates a signed JWT from data.
- `getSignedJWT`: Tạo JWT đã ký từ dữ liệu.
- `verifySignedJWT`: Verifies a signed JWT.
- `verifySignedJWT`: Xác thực JWT đã ký.

### Usage 📖

Cách dùng 📖

To use any utility function or module, you need to:

Để dùng bất kỳ hàm hoặc module tiện ích nào, bạn cần:

1. **Import the Module:** Include it in your JavaScript file.
1. **Import module:** Nhúng nó vào file JavaScript của bạn.
2. **Call the Function:** Use the available functions as needed.
2. **Gọi hàm:** Sử dụng các hàm có sẵn theo nhu cầu.

Example:

Ví dụ:

```javascript
const { zipDirectory } = require('./utils/archiver');
zipDirectory('path/to/directory', 'path/to/archive.zip');
```
