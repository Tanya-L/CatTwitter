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
        // Remove DelaySeconds parameter and value for FIFO queues
        DelaySeconds: 3,
        // MessageAttributes: {
        //     DataType: "String",
        //     Email: {
        //         DataType: "String",
        //         StringValue: email
        //     },
        //     Text: {
        //         DataType: "String",
        //         StringValue: text
        //     }
        // },
        MessageBody: JSON.stringify(m),
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.eu-north-1.amazonaws.com/182446513661/emailQueue"
    };

    return sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error sending queue msg", err);
        } else {
            console.log("Success queue msg", data.MessageId)
        }
    });
}

exports.sendQueueMsg = sendQueueMsg;
