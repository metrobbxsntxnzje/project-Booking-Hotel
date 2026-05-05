// Import the path library for working with file paths
// Import thư viện path để làm việc với đường dẫn tệp
const path = require('path');

// Import winston for logging
// Import winston để ghi log
const { createLogger, transports, config, format } = require('winston');

// Import typedefs for custom types
// Import typedefs cho các kiểu dữ liệu tùy chỉnh
const { typedefs } = require('../typedefs');

// Helper function to get the filename of the calling module 📁
// Hàm trợ giúp để lấy tên tệp của module đang gọi 📁
// const getLabel = (callingModule) => {
// 	const parts = callingModule.filename.split(path.sep);
// 	return path.join(parts[parts.length - 2], parts.pop());
// };

const getLabel = (input) => {
	if (!input) return 'unknown';

	let filename;

	// hỗ trợ cả __filename và module
	if (typeof input === 'string') {
		filename = input;
	} else if (input.filename) {
		filename = input.filename;
	} else {
		return 'unknown';
	}

	// lấy dạng: folder/file.js
	const parts = filename.split(path.sep);

	if (parts.length >= 2) {
		return path.join(parts[parts.length - 2], parts[parts.length - 1]);
	}

	return parts[parts.length - 1];
};

// Helper function to format the metadata for logging 🛠️
// Hàm trợ giúp để định dạng metadata khi ghi log 🛠️
const logMetaReplacer = (key, value) => {
	if (key === 'error') {
		return value.name + ': ' + value.message;
	}
	return value;
};

const formatMeta = (meta) => {
	const metadata = JSON.parse(JSON.stringify(meta, logMetaReplacer));

	return metadata && Object.keys(metadata).length
		? ` ${JSON.stringify(metadata)}`
		: '';
};

// Format the log message with timestamp, label, level, message, and metadata 📝
// Định dạng log với thời gian, nhãn, cấp độ, nội dung và metadata 📝
const logFormat = format.printf(
	({ level, message, label, timestamp, ...meta }) => {
		if (meta.error) {
			for (const key in meta.error) {
				if (typeof key !== 'symbol' && key !== 'message' && key !== 'name') {
					delete meta.error[key];
				}
			}
		}
		return `${timestamp} [${label}] ${level}: ${message}${formatMeta(meta)}`;
	}
);

// Create a logger function to use in different modules 📜
// Tạo hàm logger để dùng ở nhiều module khác nhau 📜
const logger = (callingModule) => {
	return createLogger({
		levels: config.npm.levels,
		format: format.combine(
			format.label({ label: getLabel(callingModule) }),

			format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			logFormat
		),
		transports: [
			// Log to the console
			// Ghi log ra console
			new transports.Console(),
			// Log to a file for general messages
			// Ghi log chung ra tệp
			new transports.File({ filename: __dirname + '/../logs/common.log' }),
			// Log to a file for error messages
			// Ghi log lỗi ra tệp riêng
			new transports.File({
				filename: __dirname + '/../logs/error.log',
				level: 'error',
			}),
		],
	});
};

// Export the logger function to be used in other files
// Export hàm logger để dùng ở các file khác
module.exports = logger;
