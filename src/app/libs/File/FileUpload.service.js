const Multer = require('multer');
/**
 * Class representing a FileUploadService
 * @class
 *
 * @memberOf Lib.File
 */
class FileUploadService {
  /**
   * Generate form-data file uploader middelware.
   * @param {Object} path - The path string.
   * @param {Object} fields  - The fields array.
   * @return {Promise} Promise object represents the response.
   */
  requestFormDataHandler(path = 'upload', fields = []) {
    const storage = Multer.diskStorage({
      destination(request, file, cb) {
        cb(null, path);
      },
      filename(request, file, cb) {
        cb(null, `${new Date().toISOString()}-${file.originalname}`);
      },
    });

    return Multer({ storage }).fields(fields);
  }
}

module.exports = FileUploadService;
