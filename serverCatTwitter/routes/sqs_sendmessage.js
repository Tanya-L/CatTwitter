// Load the AWS SDK for Node.js
const {SQS} = require('@aws-sdk/client-sqs');
const sqs = new SQS({region: 'eu-north-1'});

function sendQueueMsg(email, text) {
    const params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        DelaySeconds: 10,
        MessageAttributes: {
            "Email": {
                DataType: "String",
                StringValue: email
            }
        },
        MessageBody: text,
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.eu-north-1.amazonaws.com/182446513661/emailQueue"
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error sending queue msg", err);
        }
    });
}