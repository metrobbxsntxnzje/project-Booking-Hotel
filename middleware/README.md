# Middleware 🛠️

Middleware 🛠️

## What is Middleware? 🤔

Middleware là gì? 🤔

Middleware functions are special functions that sit between the client’s request and the server’s response. They perform important tasks such as checking if a user is authorized, validating data, or logging information.

Middleware là các hàm đặc biệt nằm giữa request từ client và response từ server. Chúng thực hiện các tác vụ quan trọng như kiểm tra quyền truy cập của người dùng, xác thực dữ liệu hoặc ghi log thông tin.

### Purpose 🎯

Mục đích 🎯

This folder contains middleware functions that help handle specific tasks, such as:

Thư mục này chứa các hàm middleware giúp xử lý những tác vụ cụ thể, chẳng hạn như:

- **Authentication:** Verifying that a user is who they claim to be.
- **Authentication:** Xác minh người dùng đúng là người mà họ khai báo.
- **Validation:** Checking that incoming data is correct and secure.
- **Validation:** Kiểm tra dữ liệu đầu vào là chính xác và an toàn.

### Structure 🗂️

Cấu trúc 🗂️

The folder contains the following middleware files:

Thư mục này chứa các file middleware sau:

- **`admin.js`**: This file checks if a user has admin privileges by verifying their credentials against environment variables 🔑
- **`admin.js`**: File này kiểm tra xem người dùng có quyền admin hay không bằng cách đối chiếu thông tin đăng nhập với biến môi trường 🔑
- **`captcha.js`**: This file ensures that Google ReCAPTCHA v2 has been completed to prevent bot attacks 🤖
- **`captcha.js`**: File này bảo đảm Google ReCAPTCHA v2 đã được hoàn thành để ngăn bot tấn công 🤖

### How Middleware Works 🔄

Cách middleware hoạt động 🔄

Each middleware file exports a function that can be used to:

Mỗi file middleware export ra một hàm có thể dùng để:

1. **Validate Requests:** Make sure the request meets certain criteria before processing it.
1. **Kiểm tra request:** Bảo đảm request đáp ứng một số tiêu chí trước khi được xử lý.
2. **Authenticate Users:** Check if a user has the right permissions to access certain resources.
2. **Xác thực người dùng:** Kiểm tra người dùng có đủ quyền để truy cập một số tài nguyên hay không.
3. **Log Information:** Record details about the request for debugging or monitoring.
3. **Ghi log thông tin:** Ghi lại chi tiết request để phục vụ debug hoặc giám sát.

Explore these middleware functions to see how they can be used to make your application more secure and reliable! 🔍

Hãy khám phá các middleware này để xem chúng có thể giúp ứng dụng của bạn an toàn và ổn định hơn như thế nào. 🔍
