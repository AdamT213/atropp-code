const AWS = require("aws-sdk");
const Fs = require('fs')

require('dotenv').config()

const s3 = new AWS.S3({accessKeyId: process.env.aws_access_key_id, secretAccessKey: process.env.aws_secret_access_key});

exports.uploadFileAtPath = async (path, id) => {
    const stream = Fs.createReadStream(path)
    var params = {
        ACL: "public-read", 
        Body: stream, 
        Bucket: "adam-tropp-blog-posts", 
        Key: id
       };
       return s3.putObject(params, function(err, data) {
         if (err) throw err
         return data;
       })
}

exports.uploadFile = async (buffer, id) => {
  var params = {
      ACL: "public-read", 
      Body: buffer, 
      Bucket: "adam-tropp-blog-posts", 
      Key: id + "-img"
     };
     return s3.putObject(params, function(err, data) {
       if (err) throw err
       return data;
     })
}



