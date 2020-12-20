const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const {v4: uuidv4} = require("uuid")

const TABLE_NAME = "Cat-Posts";

class Post {
    id;
    ownerUserid;
    ownerName;
    text;
    createdAt;

    constructor(id, ownerUserid, ownerName, text) {
        this.id = id;
        this.ownerUserid = ownerUserid;
        this.ownerName = ownerName;
        this.text = text;
        this.createdAt = new Date().getTime()
    }

    save() {
        const params = {
            Item: this.createJsonDict(),
            TableName: TABLE_NAME
        };
        return dynamoDb.put(params).promise();
    }

    static scan() {
        const params = {
            TableName: TABLE_NAME
        }
        return dynamoDb.scan(params).promise()
    }

    createJsonDict() {
        return {
            "id": this.id,
            "ownerUserid": this.ownerUserid,
            "ownerName": this.ownerName,
            "text": this.text,
            "createdAt": this.createdAt,
        };
    }

    static createId() {
        return uuidv4();
    }

    static delete(id) {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                "id": id
            }
        }
        return dynamoDb.delete(params).promise()
    }
}

exports.Post = Post
