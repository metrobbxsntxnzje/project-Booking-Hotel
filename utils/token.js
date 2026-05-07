// Import the fs module for file system operations 🗂️
// Import module fs để thao tác với hệ thống tệp 🗂️
const jwt = require('jsonwebtoken')

const fs = require('fs');
function requireEnv(key) {
	const val = process.env[key];
	if (!val) throw new Error(`[JWT] Thiếu biến môi trường: ${key}`);
	return val;
}

const ALGORITHM = requireEnv('JWT_ALGORITHM');
const JWT_ISSUER = requireEnv('JWT_ISSUER');
const JWT_AUDIENCE = requireEnv('JWT_AUDIENCE');
const ACCESS_EXPIRES = requireEnv('JWT_ACCESS_EXPIRES');
const REFRESH_EXPIRES = requireEnv('JWT_REFRESH_EXPIRES');
// Import module jwt để làm việc với JSON Web Token (JWT) 🔑
/** @type {import('jsonwebtoken').SignOptions} */
const BASE_SIGN_OPTIONS = {
	algorithm: ALGORITHM,
	issuer: JWT_ISSUER,
	audience: JWT_AUDIENCE,
};
/** @type {import('jsonwebtoken').VerifyOptions} */
const BASE_VERIFY_OPTIONS = {
	algorithms: [ALGORITHM],
	issuer: JWT_ISSUER,
	audience: JWT_AUDIENCE,
};

// Đọc khóa private và public từ các tệp được chỉ định trong biến môi trường
function loadKeys() {
	const privPath = process.env.PRIVKEY;
	const pubPath = process.env.PUBKEY;

	if (!privPath || !pubPath) {
		throw new Error('[JWT] Thiếu biến môi trường PRIVKEY hoặc PUBKEY');
	}

	let privateKey, publicKey;
	try {
		privateKey = fs.readFileSync(privPath);
		publicKey = fs.readFileSync(pubPath);
	} catch (err) {
		throw new Error(`[JWT] Không thể đọc RSA key: ${err.message}`);
	}

	return { privateKey, publicKey };
}

const { privateKey, publicKey } = loadKeys();


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
 * @param {jwt.JwtPayload}  
 * @returns {string|any} - Dữ liệu token sau khi giải mã
 */
// const verifySignedJWT = (signedString) => {
// 	// Verify the signed JWT using the public key
// 	// Xác thực JWT đã ký bằng public key
// 	return jwt.verify(signedString, publicKey, {
// 		algorithms: ['RS256'],
// 	});
// };
/**
 * Validate payload trước khi sign.
 * @param {object} payload
 */
function assertPayload(payload) {
	if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
		throw new TypeError('[JWT] payload phải là một object hợp lệ');
	}
}
function generateAccessToken(payload) {
	assertPayload(payload);
	return jwt.sign(payload, privateKey, {
		...BASE_SIGN_OPTIONS,
		expiresIn: ACCESS_EXPIRES,
	});
}

function generateRefreshToken(payload) {
	assertPayload(payload);
	return jwt.sign(payload, privateKey, {
		...BASE_SIGN_OPTIONS,
		expiresIn: REFRESH_EXPIRES,
	});
}

function verifyAccessToken(token) {
	if (!token || typeof token !== 'string') {
		throw new TypeError('[JWT] token phải là string');
	}
	return jwt.verify(token, publicKey, BASE_VERIFY_OPTIONS);
}
function verifyRefreshToken(token) {
	if (!token || typeof token !== 'string') {
		throw new TypeError('[JWT] token phải là string');
	}
	return jwt.verify(token, publicKey, BASE_VERIFY_OPTIONS);
}
module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	ACCESS_EXPIRES,
	REFRESH_EXPIRES,
};
