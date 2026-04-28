// Import the fs module for file system operations 🗂️
// Import module fs để thao tác với hệ thống tệp 🗂️
const fs = require('fs');

// Import the jwt module for working with JSON Web Tokens (JWT) 🔑
// Import module jwt để làm việc với JSON Web Token (JWT) 🔑
const jwt = require('jsonwebtoken');

// Read the private and public keys from files specified by environment variables
// Đọc khóa private và public từ các tệp được chỉ định trong biến môi trường
const privateKey = fs.readFileSync(process.env.PRIVKEY);
const publicKey = fs.readFileSync(process.env.PUBKEY);

/**
 * Generate a JSON Web Token (JWT) using a secret key
 * Tạo JSON Web Token (JWT) bằng secret key
 * @param {string|any} data - Data to be included in the token
 * @param {string|any} data - Dữ liệu sẽ được đưa vào token
 * @returns {jwt.JwtPayload} - The generated JWT
 * @returns {jwt.JwtPayload} - JWT đã được tạo
 */
const getJWT = (data) => {
	// Create a JWT using the secret key
	// Tạo JWT bằng secret key
	return jwt.sign({ id: data }, process.env.JWTSECRET, { algorithm: 'HS256' });
};

/**
 * Generate a signed JWT using the private key
 * Tạo JWT đã ký bằng private key
 * @param {string|any} data - Data to be included in the token
 * @param {string|any} data - Dữ liệu sẽ được đưa vào token
 * @returns {jwt.JwtPayload} - The signed JWT
 * @returns {jwt.JwtPayload} - JWT đã được ký
 */
const getSignedJWT = (data) => {
	// Create a signed JWT using the private key
	// Tạo JWT đã ký bằng private key
	return jwt.sign({ id: data }, privateKey, {
		algorithm: 'RS256', // Asymmetric signing algorithm
	});
};

/**
 * Verify a JWT using the secret key
 * Xác thực JWT bằng secret key
 * @param {jwt.JwtPayload} data - The JWT to verify
 * @param {jwt.JwtPayload} data - JWT cần xác thực
 * @returns {string|any} - The decoded token data
 * @returns {string|any} - Dữ liệu token sau khi giải mã
 */
const verifyJWT = (data) => {
	// Verify the JWT using the secret key
	// Xác thực JWT bằng secret key
	return jwt.verify(data, process.env.JWTSECRET, { algorithms: ['HS256'] });
};

/**
 * Verify a signed JWT using the public key
 * Xác thực JWT đã ký bằng public key
 * @param {jwt.JwtPayload} signedString - The signed JWT to verify
 * @param {jwt.JwtPayload} signedString - JWT đã ký cần xác thực
 * @returns {string|any} - The decoded token data
 * @returns {string|any} - Dữ liệu token sau khi giải mã
 */
const verifySignedJWT = (signedString) => {
	// Verify the signed JWT using the public key
	// Xác thực JWT đã ký bằng public key
	return jwt.verify(signedString, publicKey, {
		algorithms: ['RS256'],
	});
};

// Export the functions for use in other files
// Export các hàm để dùng ở những file khác
module.exports = {
	getJWT,
	verifyJWT,
	getSignedJWT,
	verifySignedJWT,
};
