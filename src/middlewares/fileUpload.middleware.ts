import multer from 'multer';

const fileUpload = multer({
	storage: multer.memoryStorage(), // Use memory storage to process the file in memory
	limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export { fileUpload };
