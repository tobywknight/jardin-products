var express = require('express');
var app = express();
//bodyparser helps us to parse the HTTP Post request
var bodyParser = require('body-parser');

//External file to store credentials.  This must not be uploaded to repo.
var credentials = require('./credentials.js');

// Allow CORS:
app.use('/api', require('cors')());

//Add connect to DynamoDB
var AWS = require("aws-sdk");

// Library to generate random ID for new product
var randomHex = require('randomhex');
var newID;

switch(app.get('env')){
    case 'development':
        AWS.config.update({
            region: credentials.dynamoDB.development.region,
            endpoint: credentials.dynamoDB.development.endpoint,
            accessKeyId: credentials.dynamoDB.development.accessKeyId,
            secretAccessKey: credentials.dynamoDB.development.secretAccessKey
        });
        break;
    case 'production':
        AWS.config.update({
            region: credentials.dynamoDB.production.region,
            endpoint: credentials.dynamoDB.production.endpoint,
            accessKeyId: credentials.dynamoDB.production.accessKeyId,
            secretAccessKey: credentials.dynamoDB.production.secretAccessKey
        });
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
};

var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = credentials.dynamoDB.development.TableName;

app.set('port', process.env.PORT || 80);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// define API routes here with rest.VERB:

// GET by product ID allows one product to be retrieved.
// TODO -- Need to add error handling for GET for unknown product ID!!!
app.get('/api/product/:id', function(req,res){
    var id = (req.params.id).toString();
    var params = {
        TableName: tableName,
        Key: {
            'id': id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.json({
                id: data.Item.id,
                productName: data.Item.productName,
                description: data.Item.description,
                category: data.Item.category,
                price: data.Item.price
            });
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            return res.status(200).send();
        };
    });
});

// GET all products
app.get('/api/products', function(req, res){
    var params = {TableName: tableName}
    docClient.scan(params, function(err, data) {
        if(err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            return res.status(500).send('Error occurred: database error.');
        } else{
            res.json(data.Items.map(function(element, index, array) {
                return {
                    id: element.id,
                    productName: element.productName,
                    description: element.description,
                    category: element.category,
                    price: element.price
                }
            }));
        };
        //
    });
});

// POST method allows creation of new product
app.post('/api/product', function(req, res){
    newID = randomHex(16);
    console.log("newID = " + newID);
    var params = {
        TableName: tableName,
        Item: {
            'id': newID,
            'productName': req.body.productName,
            'category': req.body.category,
            'description': req.body.description,
            'price': req.body.price.toString()
        }
    };
    // Call DynamoDB to add the item to the table
    docClient.put(params, function(err, data) {
        if (err) {
            return res.status(500).send('Error occurred: database error:' + err.toString());
        } else {
            return res.status(200).send("POST request successful with 'id' = " + newID + "\n");
        }
    });
});

// PUT allows a product to be updated.
app.put('/api/product/:id', function(req, res){
    var id = (req.params.id).toString();
        console.log("req.body.productName = " + req.body.productName);
        console.log("req.body.category = " + req.body.category);
        console.log("req.body.description = " + req.body.description);
        console.log("req.body.price = " + req.body.price);
    var params = {
        TableName: tableName,
        Key: {
            'id': id
        },
        UpdateExpression: "set productName = :n, category=:c, description=:d, price=:p",
        ExpressionAttributeValues: {
            ":n": req.body.productName,
            ":c": req.body.category,
            ":d": req.body.description,
            ":p": req.body.price
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function(err, data){
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            return res.status(200).send("PUT request successful with 'id' = " + id + "\n");
        }
    }); 
});

// DELETE allows one product to be deleted.
// TODO how to handle product ID not found.
app.delete('/api/product/:id', function(req, res){
    var id = (req.params.id).toString();
    params = {
        TableName: tableName,
        Key: {
            'id': id
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success: ", id, " has been deleted.");
            return res.status(200).send("Success: " + id + " has been deleted.");
        };   
    });
});

// API configuration

// link API into pipeline

// 404 handler goes here

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
