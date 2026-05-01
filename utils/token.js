// Import the fs module for file system operations 🗂️
// Import module fs để thao tác với hệ thống tệp 🗂️
const fs = require('fs');

// Import module jwt để làm việc với JSON Web Token (JWT) 🔑
const jwt = require('jsonwebtoken');

// Đọc khóa private và public từ các tệp được chỉ định trong biến môi trường
let privateKey, publicKey;
try {
	privateKey = fs.readFileSync(process.env.PRIVKEY)
	publicKey = fs.readFileSync(process.env.PUBKEY)

}catch(err){
	console.warn("Khong tim thay RSA key , fallback ve HS256")
}
const ACCESS_EXPIRES  = '15m';  
const REFRESH_EXPIRES = '7d';
/**
 * Generate a JSON Web Token (JWT) using a secret key
 * Tạo JSON Web Token (JWT) bằng secret key
 * @param {string|any} data - Dữ liệu sẽ được đưa vào token
 * @returns {jwt.JwtPayload} - JWT đã được tạo
 */
// const getJWT = (data) => {
// 	// Tạo JWT bằng secret key
// 	return jwt.sign({ id: data }, process.env.JWTSECRET, { algorithm: 'HS256' });
// };

/**
 * Generate a signed JWT using the private key
 * Tạo JWT đã ký bằng private key
 * @param {string|any} data - Dữ liệu sẽ được đưa vào token
 * @returns {jwt.JwtPayload} - JWT đã được ký
 */
// const getSignedJWT = (data) => {
// 	// Create a signed JWT using the private key
// 	// Tạo JWT đã ký bằng private key
// 	return jwt.sign({ id: data }, privateKey, {
// 		algorithm: 'RS256', // Asymmetric signing algorithm
// 	});
// };

/**
 * Verify a JWT using the secret key
 * Xác thực JWT bằng secret key
 * @param {jwt.JwtPayload} data - JWT cần xác thực
 * @returns {string|any} - Dữ liệu token sau khi giải mã
 */
// const verifyJWT = (data) => {
// 	// Xác thực JWT bằng secret key
// 	return jwt.verify(data, process.env.JWTSECRET, { algorithms: ['HS256'] });
// };

/**
 * Verify a signed JWT using the public key
 * Xác thực JWT đã ký bằng public key
 * @param {jwt.JwtPayload} signedString - JWT đã ký cần xác thực
 * @returns {string|any} - Dữ liệu token sau khi giải mã
 */
// const verifySignedJWT = (signedString) => {
// 	// Verify the signed JWT using the public key
// 	// Xác thực JWT đã ký bằng public key
// 	return jwt.verify(signedString, publicKey, {
// 		algorithms: ['RS256'],
// 	});
// };

const generateAccessToken = (payload) => 
jwt.sign(payload,privateKey, {algorithm: 'RS256',ACCESS_EXPIRES});

const generateRefreshToken = (payload) =>
jwt.sign(payload,privateKey, {algorithm : 'RS256', REFRESH_EXPIRES })

const verifyAccessToken = (token) => 
{
	try {
		return jwt.verify(token,publicKey, { algorithms: ['RS256'] });
	}
	catch{
		return null;
	}
}
const verifyRefreshToken = (token) => {
	try { return jwt.verify(token, publicKey, { algorithms: ['RS256'] }); }
	catch { return null; }
  };
// Export the functions for use in other files
// Export các hàm để dùng ở những file khác
module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken
};
