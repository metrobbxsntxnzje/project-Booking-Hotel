const fs = require('fs'); // Import the file system module to handle file operations
const archiver = require('archiver'); // Import the archiver module to create ZIP files

/**
 * Create a ZIP archive of a directory
 * Tạo tệp ZIP từ một thư mục
 *
 * @param {String} sourceDir - Path to the directory you want to compress (e.g., '/some/folder/to/compress')
 * @param {String} sourceDir - Đường dẫn tới thư mục bạn muốn nén, ví dụ '/some/folder/to/compress'
 * @param {String} outPath - Path where the ZIP file will be saved (e.g., '/path/to/created.zip')
 * @param {String} outPath - Đường dẫn nơi tệp ZIP sẽ được lưu, ví dụ '/path/to/created.zip'
 * @returns {Promise} - A promise that resolves when the ZIP file is created
 * @returns {Promise} - Promise sẽ hoàn thành khi tệp ZIP được tạo xong
 */
function zipDirectory(sourceDir, outPath) {
	// Create an instance of archiver to create a ZIP file with the highest compression level (9)
	// Tạo instance archiver để tạo tệp ZIP với mức nén cao nhất là 9
	const archive = archiver('zip', { zlib: { level: 9 } });

	// Create a write stream to the output file
	// Tạo write stream tới tệp đầu ra
	const stream = fs.createWriteStream(outPath);

	// Return a promise that resolves when the archiving process is complete
	// Trả về promise hoàn thành khi quá trình nén kết thúc
	return new Promise((resolve, reject) => {
		// Add the directory to the archive. The 'false' argument means not to include the directory itself, just its contents.
		// Thêm thư mục vào archive. Tham số 'false' nghĩa là không gồm chính thư mục đó mà chỉ lấy nội dung bên trong.
		archive
			.directory(sourceDir, false)

			// Handle any errors that occur during the archiving process
			// Xử lý lỗi nếu có trong quá trình nén
			.on('error', (err) => reject(err))

			// Pipe the archive data to the write stream
			// Đưa dữ liệu archive vào write stream
			.pipe(stream);

		// Resolve the promise when the write stream is closed (ZIP file is created)
		// Hoàn thành promise khi write stream đóng lại, tức là tệp ZIP đã được tạo
		stream.on('close', () => resolve());

		// Finalize the archive (complete the ZIP creation process)
		// Kết thúc archive để hoàn tất quá trình tạo ZIP
		archive.finalize();
	});
}

// Export the zipDirectory function to be used in other files
// Export hàm zipDirectory để dùng ở các file khác
module.exports = {
	zipDirectory,
};
