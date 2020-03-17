const router = require('express').Router();

const customMulter = require('../Utils/Multer')();

const FileUploadController = require('../Controllers/FileUpload');

router.post('/', customMulter.single('file'), FileUploadController.fileUpload);

module.exports = router;
