# Database Models 📊

Model cơ sở dữ liệu 📊

## What are Database Models? 🤔

Database Model là gì? 🤔

Database models define the structure and relationships of your database tables using an Object-Relational Mapping (ORM) library. In this project, we use Sequelize, a popular ORM for Node.js.

Database model định nghĩa cấu trúc và mối quan hệ của các bảng trong cơ sở dữ liệu thông qua thư viện ORM. Trong dự án này, chúng ta dùng Sequelize, một ORM phổ biến cho Node.js.

### Purpose 🎯

Mục đích 🎯

This folder contains Sequelize models that:

Thư mục này chứa các model Sequelize dùng để:

- **Define Tables:** Specify the structure of each table in your database.
- **Định nghĩa bảng:** Xác định cấu trúc của từng bảng trong cơ sở dữ liệu.
- **Set Relationships:** Describe how different tables are related (e.g., one-to-many, many-to-many).
- **Thiết lập quan hệ:** Mô tả cách các bảng liên kết với nhau, ví dụ một-nhiều hoặc nhiều-nhiều.

### Structure 🗂️

Cấu trúc 🗂️

The folder contains the following file:

Thư mục này chứa file sau:

- **`index.js`**: The main file that sets up and initializes all models. It loads model definitions, sets up relationships, and exports the models so they can be used elsewhere in your application.
- **`index.js`**: File chính dùng để thiết lập và khởi tạo tất cả model. Nó nạp định nghĩa model, tạo quan hệ giữa các model và export chúng để sử dụng ở nơi khác trong ứng dụng.

### Content Overview 📚

Tổng quan nội dung 📚

The `index.js` file:

File `index.js`:

- **Imports Modules:** Includes necessary libraries and utilities, such as Sequelize and a custom logger.
- **Import module:** Bao gồm các thư viện và tiện ích cần thiết như Sequelize và logger tùy chỉnh.
- **Loads Configuration:** Gets the database settings for the current environment (development, staging, production).
- **Nạp cấu hình:** Lấy thiết lập cơ sở dữ liệu cho môi trường hiện tại như development, staging hoặc production.
- **Creates Sequelize Instance:** Connects to the database using configuration details.
- **Tạo instance Sequelize:** Kết nối tới cơ sở dữ liệu dựa trên chi tiết cấu hình.
- **Initializes Models:** Loads all model definitions from the current folder, excluding non-JS files and itself.
- **Khởi tạo model:** Nạp tất cả định nghĩa model trong thư mục hiện tại, ngoại trừ các file không phải JS và chính nó.
- **Sets Up Associations:** Defines relationships between models.
- **Thiết lập association:** Định nghĩa mối quan hệ giữa các model.
- **Exports Models:** Makes the Sequelize instance and models available for use in other parts of your application.
- **Export model:** Cung cấp instance Sequelize và các model để dùng ở các phần khác trong ứng dụng.

Explore these models to understand how your database is structured and how different parts of your application interact with it! 🔍

Hãy khám phá các model này để hiểu cách cơ sở dữ liệu được tổ chức và cách các phần khác nhau của ứng dụng tương tác với nó. 🔍
