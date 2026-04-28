# Configuration Folder 🗂️

Thư mục cấu hình 🗂️

This folder contains important configuration files for setting up the backend application.

Thư mục này chứa các tệp cấu hình quan trọng để thiết lập ứng dụng backend.

## sequelize.js 🔧

`sequelize.js` 🔧

This file sets up the database configuration for different stages of development. It helps the application connect to the database depending on whether you are working locally, in a staging environment, or in a production environment.

Tệp này thiết lập cấu hình cơ sở dữ liệu cho các giai đoạn phát triển khác nhau. Nó giúp ứng dụng kết nối tới cơ sở dữ liệu tùy theo việc bạn đang làm việc cục bộ, trong môi trường staging hay production.

### Environment Variables 🌱

Biến môi trường 🌱

To keep sensitive information like database credentials safe, we use environment variables. Before running the application, you need to set these variables in your environment. Here’s what you need to set:

Để giữ an toàn cho các thông tin nhạy cảm như thông tin đăng nhập cơ sở dữ liệu, chúng ta sử dụng biến môi trường. Trước khi chạy ứng dụng, bạn cần thiết lập các biến này trong môi trường của mình. Dưới đây là những biến cần cấu hình:

- `DB_USERNAME`: Your PostgreSQL username 🧑‍💻
- `DB_USERNAME`: Tên người dùng PostgreSQL của bạn 🧑‍💻
- `DB_PASSWORD`: Your PostgreSQL password 🔑
- `DB_PASSWORD`: Mật khẩu PostgreSQL của bạn 🔑
- `DB_NAME`: The name of your PostgreSQL database 📦
- `DB_NAME`: Tên cơ sở dữ liệu PostgreSQL của bạn 📦
- `DB_URL`: A connection URL for PostgreSQL used in staging and production environments 🌐
- `DB_URL`: URL kết nối PostgreSQL dùng cho môi trường staging và production 🌐

### Configuration Settings ⚙️

Thiết lập cấu hình ⚙️

The configuration is divided into three main parts:

Cấu hình được chia thành ba phần chính:

1. **Development:** Settings for when you're working on your local machine. It uses environment variables to get the database username, password, and name.
1. **Development:** Thiết lập dùng khi bạn làm việc trên máy cục bộ. Phần này sử dụng biến môi trường để lấy tên người dùng, mật khẩu và tên cơ sở dữ liệu.
2. **Staging:** Settings for a testing environment that mimics production. It uses the `DB_URL` environment variable to connect to the database and ensures a secure connection with SSL encryption.
2. **Staging:** Thiết lập cho môi trường kiểm thử mô phỏng production. Phần này dùng biến môi trường `DB_URL` để kết nối cơ sở dữ liệu và bảo đảm kết nối an toàn bằng mã hóa SSL.
3. **Production:** Settings for the live environment where your application will be used by real users. Like staging, it uses the `DB_URL` variable and SSL encryption for secure connections.
3. **Production:** Thiết lập cho môi trường thực tế nơi ứng dụng của bạn được người dùng thật sử dụng. Tương tự staging, phần này dùng biến `DB_URL` và mã hóa SSL để bảo mật kết nối.

Update these settings and environment variables based on your project needs. 🛠️

Hãy cập nhật các thiết lập và biến môi trường này theo nhu cầu của dự án. 🛠️
