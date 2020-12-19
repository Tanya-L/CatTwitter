// Load the AWS SDK for Node.js
const {SQS} = require('@aws-sdk/client-sqs');
const sqs = new SQS({
    region: 'eu-north-1',
    apiVersion: '2012-11-05'
});

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

    return sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.error("Error sending queue msg", err);
        } else {
            console.info("Success queue msg", data.MessageId)
        }
    });
}

exports.sendQueueMsg = sendQueueMsg;
