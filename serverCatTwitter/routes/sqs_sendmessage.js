// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

async function sendQueueMsg(email, text) {
    const m = {
        Email: email,
        Text: text
    }
    const params = {
        DelaySeconds: 3,
        MessageBody: JSON.stringify(m),
        QueueUrl: "https://sqs.eu-north-1.amazonaws.com/182446513661/emailQueue"
    };

    console.info("Sending!")
    console.info(params)
    return sqs.sendMessage(params).promise();
}

exports.sendQueueMsg = sendQueueMsg;
