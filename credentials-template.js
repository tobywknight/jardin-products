module.exports = {
    dynamoDB: {
        development: {
            endPoint: "https://dynamodb.<region>.amazonaws.com",
            region: "<region>",
            accessKeyId: "<access key>",
            secretAccessKey: "<secret access key>",
            TableName: "<table name>"
        },
        production: {
            endPoint: "https://dynamodb.<region>.amazonaws.com",
            region: "<region>",
            accessKeyId: "<access key>",
            secretAccessKey: "<secret access key>",
            TableName: "<table name>"
        }
    }
};
