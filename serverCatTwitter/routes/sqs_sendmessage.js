// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

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

    return sqs.sendMessage(params);
}

exports.sendQueueMsg = sendQueueMsg;
