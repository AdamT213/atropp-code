const AWS = require("aws-sdk");
const Fs = require('fs')

require('dotenv').config()

const s3 = new AWS.S3({accessKeyId: process.env.aws_key, secretAccessKey: process.env.aws_secret});

exports.uploadFileAtPath = async (path, id) => {
  try {
    const stream = Fs.createReadStream(path)
    let params = {
        ACL: "public-read", 
        Body: stream, 
        Bucket: "adam-tropp-blog-posts", 
        Key: id
       };
       await s3.putObject(params, (err, data) => { 
         if (err) console.log(err, err.stack)
         else console.log(data)
       })
      } catch (e) { 
        throw e
      }
}

exports.uploadFile = async (buffer, id) => {
  try {
  var params = {
      ACL: "public-read", 
      Body: buffer,
      Bucket: "adam-tropp-blog-posts", 
      Key: id + "-img"
     };
     await s3.putObject(params, (err, data) => { 
      if (err) console.log(err, err.stack)
      else console.log(data)
     })
  } catch (e) { 
    throw e
  }
}



