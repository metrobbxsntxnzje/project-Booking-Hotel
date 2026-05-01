// Load environment variables from a .env file
// Nạp biến môi trường từ tệp .env
require('dotenv').config();

const { dateForFilename } = require('./utils/dateFormatter')
// Import the Express.js framework to create a web server
// Import framework Express.js để tạo web server
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');



// Import middleware for security and logging
// Import middleware phục vụ bảo mật và ghi log
const cors = require('cors'); // Allows cross-origin requests
const helmet = require('helmet'); // Adds security headers
const logger = require('./utils/logger'); // Custom logging utility

// Configure Express to parse JSON and URL-encoded data
// Cấu hình Express để tự phân tích dữ liệu JSON và URL-encoded
app.use(express.json()); // Automatically parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different domains
// Bật Cross-Origin Resource Sharing (CORS) để xử lý request từ các domain khác nhau
app.use(cors(
	{
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true,
	}
));
// Use Helmet to set various HTTP headers for security
// Dùng Helmet để thiết lập nhiều HTTP header phục vụ bảo mật
app.use(helmet());

// Disable the "X-Powered-By" header to prevent disclosing server technology
// Tắt header "X-Powered-By" để tránh lộ công nghệ phía server
app.disable('x-powered-by');

// Define your application routes here
// Khai báo các route của ứng dụng tại đây
// Example: app.get('/api/example', (req, res) => { ... });
// Ví dụ: app.get('/api/example', (req, res) => { ... });
// Get the port number from environment variables or default to 5000
// Lấy cổng từ biến môi trường, nếu không có thì dùng mặc định là 5000
const port = process.env.PORT || 5000;

// Start the server and listen for incoming requests on the specified port
// Khởi động server và lắng nghe request tới ở cổng đã chỉ định
app.listen(port, () => {
	// Log a message to indicate the server is running
	// Ghi log để cho biết server đang chạy
	logger.info(`App Listening on port ${port}`);
});

app.get('/healthy', (req, res) => res.json({ status: 'ok', timestamp: dateForFilename() }))

app.use((req, res) => {
	res.status(400).json({ message: 'Route ${req.method} ${req.path} không tồn tại' });

});
app.use((req, res) => {
	const err = new Error('Lỗi hệ thống')
	res.status(500).json({ message: 'Lỗi server không mong đợi', error: err });

}
)
// Catch-all route for unhandled requests, responds with a simple message
// Route bắt tất cả request chưa được xử lý và phản hồi bằng thông báo đơn giản
app.use((_req, res) => {
	return res.status(200).send('Booking Hotel API is running');
});


module.exports = app;
