const createError = require("http-errors");
const uploadFile = require("../../middlewares/upload");
const API = require("../../constant/API").API;
const catchAsync = require("../../utils/catchAsync");
const { uploadOnS3, getPreSignedURL } = require("../../utils/awsSdkUtil");
const { S3_BUCKET } = require("../../enum/s3Bucket");
const { S3_BASE_PATH } = require("../../constant/API");

exports.upload = catchAsync(async (req, res) => {
  const { privateUpload } = req.query;
  await uploadFile(req, res);
  await uploadOnS3(req.file.path, req.file.mimetype, privateUpload);

  if (req.file === undefined && req.files === undefined) {
    throw createError(400, "Please upload a file!");
  }
  const filename =
    (privateUpload ? S3_BUCKET.PRIVATE : S3_BUCKET.PUBLIC) + req.file.filename;
  return {
    path: `${API.FILE_PREFIX}${req.file.filename}`,
    fileName: filename,
    dataRenderUrl: privateUpload
      ? getPreSignedURL(filename)
      : S3_BASE_PATH + filename,
    message: "File Uploaded Successfully",
  };
});

exports.getUploadPreSignedUrl = catchAsync(async (req, res) => {
  const { fileName } = req.query;
  return { dataRenderUrl: getPreSignedURL(fileName) };
});
