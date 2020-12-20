const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const {v4: uuidv4} = require("uuid")

const TABLE_NAME = "Cat-Users";

class User {
    id;
    email;
    login;
    password;
    bio;
    name;
    followers;
    following;

    static from(o) {
        let u = new User()
        Object.assign(u, o)
        return u
    }

    constructor(id, email, login, password, bio, name) {
        this.id = id;
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
            "id": this.id,
            "login": this.login,
            "password": this.password,
            "bio": this.bio,
            "name": this.name,
            "following": this.following,
            "followers": this.followers,
        };
    }

    static findByEmail(value) {
        // const params = {
        //     Key: {
        //         "email": value
        //     },
        //     TableName: TABLE_NAME
        // };
        // return dynamoDb.get(params).promise();
        // const params = {
        //     TableName: TABLE_NAME,
        //     KeyConditionExpression: "email = :x",
        //     ExpressionAttributeValues: {
        //         ":x": value
        //     }
        // }
        // return dynamoDb.query(params).promise()
        return this.scan()
            .then(({Items: elements}) => {
                const filtered = elements.filter(e => e.email === value)
                if (filtered.length > 0) {
                    return {Item: filtered[0]};
                }
                return Promise.reject("Not found")
            })
    }

    static findById(value) {
        const params = {
            Key: {
                "id": value
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

    removeFollower(userId) {
        const i = this.followers.indexOf(userId)
        if (i !== -1) {
            this.followers.splice(i, 1)
        }
    }
}

exports.User = User
