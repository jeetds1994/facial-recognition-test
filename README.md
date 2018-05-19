This is simple application leveraging the tools of the aws-sdk to use S3 and Rekognition.

This application allows you to upload images to S3 and then compare the images you have uploaded to determine how similar they are. ( The data is there, so you can do so much more! :D )

In order to run the applciation

```yarn install && yarn start ```


Things you'll probably need to do:

```
Make sure you update the cred in 'aws_config.json' found in the 'src' directory
Make sure you have full access to S3 and IAM in when creating the user.
Make sure you create a bucket named 'testingfacialrecognition' and apply the coors configuration found in.
https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html#how-do-i-enable-cors
```
