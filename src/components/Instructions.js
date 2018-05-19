import React from 'react';

const Instructions = () => {

    return (
        <div>
            Welcome! This is a test application to upload photos to S3.

            <ul>
                <li>Make sure you update the cred in 'aws_config.json' found in the 'src' directory</li>
                <li>Make sure you have full access to S3 and IAM in when creating the user.</li>
                <li>Make sure you create a bucket named 'testingfacialrecognition' and apply the coors configuration found in.</li>
                https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html#how-do-i-enable-cors
            </ul>

            When your ready start by uploading images <a href="/upload">here</a>
        </div>
    )
}

export default Instructions