const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { v4: uuidv4 } = require("uuid")

const TABLE_NAME = "Cat-Users";

class User {
    _id;
    email;
    login;
    password;
    bio;
    name;
    followers;
    following;

    constructor(_id, email, login, password, bio, name) {
        this._id = _id;
        this.email = email;
        this.login = login;
        this.password = password;
        this.bio = bio;
        this.name = name;
        this.followers = [];
        this.following = [];
    }

    save() {
        const params = {
            Item: this.createJsonDict(),
            TableName: TABLE_NAME
        };
        return dynamoDb.put(params).promise();
    }

    // update() {
    //     const params = {
    //         Item: this.createJsonDict(),
    //         TableName: "Cat-Users"
    //     };
    //     return dynamoDb.update(params).promise();
    // }

    static scan() {
        const params = {
            TableName: TABLE_NAME
        }
        return dynamoDb.scan(params).promise()
    }


    createJsonDict() {
        return {
            "email": this.email,
            "_id": this._id,
            "login": this.login,
            "password": this.password,
            "bio": this.bio,
            "name": this.name,
            "following": this.following,
            "followers": this.followers,
        };
    }

    static findByEmail(value) {
        const params = {
            Key: {
                "email": value
            },
            TableName: TABLE_NAME
        };
        return dynamoDb.get(params).promise();
    }

    static findById(value) {
        const params = {
            Key: {
                "_id": value
            },
            TableName: TABLE_NAME
        };
        return dynamoDb.get(params).promise();
    }

    static createId() {
        return uuidv4();
    }

    removeFollowing(userId) {
        const i = this.following.indexOf(userId)
        if (i !== -1) {
            this.following.splice(i, 1)
        }
    }

    removeFollower(id) {
        const i = this.followers.indexOf(userId)
        if (i !== -1) {
            this.followers.splice(i, 1)
        }
    }
}

exports.User = User
