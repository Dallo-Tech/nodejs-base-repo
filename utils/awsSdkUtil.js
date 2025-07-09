// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {s3Config} = require("../config/awsConfig");
const {S3_BUCKET} = require("../enum/s3Bucket");
// Set the region
AWS.config.update({region: process.env.AWS_S3_REGION});
// Create S3 service object
const s3 = new AWS.S3(s3Config);

exports.uploadOnS3 = async (filename,mimetype,privateUpload=false) => {
    // Configure the file stream and obtain the upload parameters
    let fileStream = fs.createReadStream(filename);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });

    // call S3 to retrieve upload file to specified bucket
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: (privateUpload?S3_BUCKET.PRIVATE:S3_BUCKET.PUBLIC)+path.basename(filename),
        ContentType: mimetype,
        Body: fileStream
    };

    // call S3 to retrieve upload file to specified bucket
    return await s3.upload(uploadParams).promise();
}
exports.getPreSignedURLToUploadObject=async (fileName)=>{
    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Expires: 60 * 60,
        // ContentType: 'image/*'
    };
    const data = s3.getSignedUrl('putObject', s3Params);
    console.log("data",data);
    return data;
}


exports.getPreSignedURL = (fileName) => {
    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Expires: 60 * 60,
    };
    console.log(s3.getSignedUrl('getObject', s3Params));
    return s3.getSignedUrl('getObject', s3Params);
}