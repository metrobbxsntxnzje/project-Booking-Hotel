# Booking Hotel Backend

Backend base cho project booking hotel, được dựng từ một boilerplate Express/Sequelize và giữ lại phần comment/tutorial để bạn tiếp tục học và phát triển.

## Mục tiêu

- Giữ lại cấu trúc base để phát triển nhanh.
- Giữ lại comment và README trong từng thư mục để dễ học.
- Loại bỏ các phần branding, sponsor, fork, template và metadata của repo gốc.

## Cấu trúc chính

- `index.js`: điểm khởi động của server Express.
- `config/`: cấu hình môi trường và Sequelize.
- `controllers/`: business logic xử lý request.
- `middleware/`: middleware dùng chung.
- `models/`: nơi khai báo model Sequelize.
- `routes/`: định nghĩa route API.
- `utils/`: các tiện ích tái sử dụng.
- `validators/`: validate request.
- `documents/`: tài liệu setup và usage đã được giữ lại ở mức cơ bản.

## Chạy project

```bash
npm install
npm run dev
```

Mặc định app chạy ở cổng `5000` nếu chưa có biến môi trường `PORT`.

## Biến môi trường cần có

- `PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_URL`

## Gợi ý bước tiếp theo

- Tạo `.env` riêng cho máy của bạn.
- Đổi route mẫu thành API cho booking hotel.
- Thêm model như `User`, `Hotel`, `Room`, `Booking`.
- Viết controller và validator theo nghiệp vụ của bạn.

## Ghi chú

Phần comment/tutorial trong code và các README thư mục vẫn được giữ lại để bạn học từ base này. File `LICENSE` hiện vẫn được giữ nguyên vì code base đang xuất phát từ một template mã nguồn mở.
