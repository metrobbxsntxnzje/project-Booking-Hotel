const baseConfig = {
	dialect: 'postgres',
	logging: false,
	pool: {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000,
	},
};
module.exports = {
	//TODO: Configuration settings for the development environment
	//TODO: Thiết lập cấu hình cho môi trường development

	development: {
		...baseConfig, // Spread operator to include the base configuration settings
		// Retrieve the database username from environment variables
		// Lấy tên người dùng cơ sở dữ liệu từ biến môi trường
		// Environment variables are used to keep sensitive information like credentials safe
		// Biến môi trường được dùng để giữ an toàn cho thông tin nhạy cảm như thông tin đăng nhập
		username: process.env.DB_USER,

		// Retrieve the database password from environment variables
		// Lấy mật khẩu cơ sở dữ liệu từ biến môi trường
		password: process.env.DB_PASSWORD,

		// Specify the host address for the database connection
		// Chỉ định địa chỉ host cho kết nối cơ sở dữ liệu
		// '127.0.0.1' is a standard address for localhost, meaning your own computer
		// '127.0.0.1' là địa chỉ chuẩn cho localhost, tức là chính máy tính của bạn
		host: '127.0.0.1',

		// Retrieve the name of the database from environment variables
		// Lấy tên cơ sở dữ liệu từ biến môi trường
		database: process.env.DB_NAME,
		

		// Specify the type of database we are using
		// Chỉ định loại cơ sở dữ liệu đang sử dụng
		// 'postgres' refers to PostgreSQL, a popular relational database system
		// 'postgres' là PostgreSQL, một hệ quản trị cơ sở dữ liệu quan hệ phổ biến
		dialect: 'postgres',
	},
	

	//TODO: Configuration settings for the staging environment
	//TODO: Thiết lập cấu hình cho môi trường staging

	staging: {
		// Use an environment variable to get the database connection URL
		// Dùng biến môi trường để lấy URL kết nối cơ sở dữ liệu
		// This URL includes all the necessary information to connect to the database
		// URL này chứa toàn bộ thông tin cần thiết để kết nối tới cơ sở dữ liệu
		use_env_variable: 'DB_URL',

		// Specify the type of database we are using
		// Chỉ định loại cơ sở dữ liệu đang sử dụng
		dialect: 'postgres',

		// Dialect options allow us to set additional settings for the database connection
		// Dialect options cho phép thiết lập các tùy chọn bổ sung cho kết nối cơ sở dữ liệu
		dialectOptions: {
			// Enable SSL encryption to secure the data transmitted between the application and the database
			// Bật mã hóa SSL để bảo vệ dữ liệu truyền giữa ứng dụng và cơ sở dữ liệu
			// SSL (Secure Sockets Layer) helps protect sensitive information
			// SSL (Secure Sockets Layer) giúp bảo vệ thông tin nhạy cảm
			ssl: true,
		},
	},

	//TODO: Configuration settings for the production environment
	//TODO: Thiết lập cấu hình cho môi trường production

	production: {
		// Use an environment variable to get the database connection URL
		// Dùng biến môi trường để lấy URL kết nối cơ sở dữ liệu
		use_env_variable: 'DB_URL',

		// Specify the type of database we are using
		// Chỉ định loại cơ sở dữ liệu đang sử dụng
		dialect: 'postgres',

		// Dialect options allow us to set additional settings for the database connection
		// Dialect options cho phép thiết lập các tùy chọn bổ sung cho kết nối cơ sở dữ liệu
		dialectOptions: {
			// Enable SSL encryption to ensure that data transmitted between the application and the database is secure
			// Bật mã hóa SSL để bảo đảm dữ liệu truyền giữa ứng dụng và cơ sở dữ liệu được an toàn
			ssl: true,
		},
	},
};
