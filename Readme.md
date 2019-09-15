# Jardin Products - Node.js API service uses AWS DynamoDB
Copyright Toby Knight 2019.

## Overview

Jardin Products is a simple Node.js, RESTful web service using Express to serve simple product data.

## Quick start
You need to create your own DynamoDB table.
[TO DO:  Add detailed instructions to create table, or add CloudFormation template.]

```
git clone https://github.com/tobywknight/jardin-products.git
cd jardin-products
npm install
```

Use AWS console or CLI. 
Edit the credentials-template.js file to include your AWS region, dynamo table name, access key and secret key.
Rename the credentials-template.js file to credentials.js

Run the local development server to test the app:

```
npm start
```

## Credits and sources
I have reused code published elsewhere.  Specific credits:
* Web Development with Node and Express, Ethan Brown, O'Reilly publishing. https://github.com/EthanRBrown/web-development-with-node-and-express
* Getting Started with the DynamoDB SDK - Node.js and DynamoDB, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html


## Known issues and TODO list
