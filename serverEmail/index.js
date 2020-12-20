// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'eu-north-1'});

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const ses = new AWS.SES({apiVersion: '2010-12-01'})

function sendMail(email, text) {
    // Create sendEmail params
    const params = {
        Destination: {ToAddresses: [email]},
        Message: { /* required */
            Body: { /* required */
                Text: {
                    Charset: "UTF-8",
                    Data: text
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'From CatTwitter'
            }
        },
        Source: 'tanya.lytovchenko@gmail.com', /* required */
        ReplyToAddresses: [
            'tanya.lytovchenko@gmail.com',
        ],
    };

    // Create the promise and SES service object
    ses.sendEmail(params)
        .promise()
        .then(function (data) {
            console.log("Mail sent, id=", data.MessageId);
        })
        .catch(function (err) {
            console.error(err, err.stack);
        });
}

function receiveMessage() {
    const queueURL = "https://sqs.eu-north-1.amazonaws.com/182446513661/emailQueue";
    const params = {
        AttributeNames: [
            "SentTimestamp"
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: queueURL,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0
    };

    sqs.receiveMessage(params, function (err, data) {
        if (err) {
            console.log("Receive Error", err);
        } else if (data.Messages) {
            const deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            sqs.deleteMessage(deleteParams, function (err, data) {
                if (err) {
                    console.log("Delete Error", err);
                } else {
                    sendMail(data.Email, data.Text)
                }
            });
        }
    });
}

async function sleep(t) {
    await new Promise(resolve => setTimeout(resolve, t));
}

async function main() {
    while (true) {
        receiveMessage();
        await sleep(5000)
    }
}

main().then(text => {
    console.log("Main function end", text)
}).catch(err => {
    console.log(err)
})
