const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new aws.S3()

aws.config.update({
    secretAccessKey: process.env.AWSSecretKeyNew,
    accessKeyId: process.env.AWSAccessKeyIdNew
})


const upload = multer({
    storage: multerS3({
        s3: s3, 
        bucket: 'vue-node-store',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload 