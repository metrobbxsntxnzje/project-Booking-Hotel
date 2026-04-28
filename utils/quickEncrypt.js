// Import the crypto module for cryptographic functions 🔒
// Import module crypto để dùng các chức năng mã hóa 🔒
const crypto = require('crypto');

// Define acceptable key sizes for encryption (in bits) 🔐
// Định nghĩa các kích thước khóa hợp lệ cho việc mã hóa, tính theo bit 🔐
const acceptableBitSizes = [1024, 2048];

/**
 * Generates a public and private key pair with a specified size
 * Tạo cặp khóa public và private với kích thước được chỉ định
 * @param {number} sizeInBits - Size of the key (1024 or 2048 bits)
 * @param {number} sizeInBits - Kích thước khóa, chỉ nhận 1024 hoặc 2048 bit
 * @returns {object} - Object with public and private keys
 * @returns {object} - Object chứa khóa public và private
 */
exports.generate = (sizeInBits) => {
	// Check if the provided key size is valid
	// Kiểm tra xem kích thước khóa được truyền vào có hợp lệ hay không
	if (!acceptableBitSizes.includes(sizeInBits)) {
		throw Error(
			'Invalid key size. Only 1024 or 2048 bits are accepted. Example: `let keys = QuickEncrypt.generate(2048);`\nKích thước khóa không hợp lệ. Chỉ chấp nhận 1024 hoặc 2048 bit. Ví dụ: `let keys = QuickEncrypt.generate(2048);`'
		);
	}
	// Generate the key pair
	// Tạo cặp khóa
	return crypto.generateKeyPairSync('rsa', { modulusLength: sizeInBits });
};

/**
 * Encrypts a string using a public key
 * Mã hóa chuỗi bằng public key
 * @param {string} payloadString - The string to encrypt
 * @param {string} payloadString - Chuỗi cần mã hóa
 * @param {string} publicKey - The public key for encryption
 * @param {string} publicKey - Public key dùng để mã hóa
 * @returns {string} - Encrypted string in hexadecimal format
 * @returns {string} - Chuỗi đã mã hóa ở định dạng hexadecimal
 */
exports.encrypt = (payloadString, publicKey) => {
	if (typeof payloadString !== 'string' || typeof publicKey !== 'string') {
		throw Error(
			"Payload and Public Key must be strings. Example: `let encryptedText = QuickEncrypt.encrypt('Some secret text', 'public RSA key');`\nPayload và Public Key phải là chuỗi. Ví dụ: `let encryptedText = QuickEncrypt.encrypt('Some secret text', 'public RSA key');`"
		);
	}
	// Encrypt the string using the public key
	// Mã hóa chuỗi bằng public key
	return crypto
		.publicEncrypt(publicKey, Buffer.from(payloadString, 'utf8'))
		.toString('hex');
};

/**
 * Decrypts an encrypted string using a private key
 * Giải mã chuỗi đã mã hóa bằng private key
 * @param {string} encryptedString - The encrypted string to decrypt
 * @param {string} encryptedString - Chuỗi đã mã hóa cần giải mã
 * @param {string} privateKey - The private key for decryption
 * @param {string} privateKey - Private key dùng để giải mã
 * @returns {string} - The decrypted string
 * @returns {string} - Chuỗi sau khi giải mã
 */
exports.decrypt = (encryptedString, privateKey) => {
	if (typeof encryptedString !== 'string' || typeof privateKey !== 'string') {
		throw Error(
			"Encrypted string and Private Key must be strings. Example: `let decryptedText = QuickEncrypt.decrypt('encrypted text', 'private RSA key');`\nEncrypted string và Private Key phải là chuỗi. Ví dụ: `let decryptedText = QuickEncrypt.decrypt('encrypted text', 'private RSA key');`"
		);
	}
	// Decrypt the string using the private key
	// Giải mã chuỗi bằng private key
	return crypto
		.privateDecrypt({ key: privateKey }, Buffer.from(encryptedString, 'hex'))
		.toString();
};
