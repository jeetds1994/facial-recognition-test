import aws_config from '../aws_config.json'
import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;
AWS.config.update(aws_config);
var bucketName = 'testingfacialrecognition'

var s3 = new AWS.S3({ params: { Bucket: bucketName }})

var rekognition = new AWS.Rekognition();

const easyS3 = {
    getListOfFilesFromS3(){
        let params = {
            Bucket: bucketName
           };
        return s3.listObjects(params).promise();
    },

    upload(data, filename) {        
        let params = {
            Body: data, 
            Bucket: bucketName, 
            Key: filename
        };
        return s3.upload(params).promise();
    },

    comparePhotos(filename1, filename2) {
        let params = {
            SimilarityThreshold: 90, 
            SourceImage: {
             S3Object: {
              Bucket: bucketName, 
              Name: filename1
             }
            }, 
            TargetImage: {
             S3Object: {
              Bucket: bucketName, 
              Name: filename2
             }
            }
        };
        return rekognition.compareFaces(params).promise();
    }
}

export default easyS3