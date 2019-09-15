This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Client app is a web app built using React and Bootstrap.

## Setup

Before you can run the site, there are a few things you need to do first:
- Configure the URL where your image files will be served from.  (I used an AWS S3 bucket.)
- Configure the URL where your Products API will be served from.  This is the deployment of the Node.js web service contained in the project root.  For development, you can run in locally. For deployment testing, I deployed it on AWS EC2, but for production use, a container-based deployment might be preferable. 

### Configure URL for image files
Open ./<your project folder>/clientapp/src/components/products.js
Edit the URL in following line to include the correct S3 bucket name and the AWS region that bucket is located in.

```
const imgFolderUrl = "https://<your-bucket-name>.s3-<aws-region>.amazonaws.com/products/";
```
For example:
```
const imgFolderUrl = "https://my-image-bucket.s3-eu-west-1.amazonaws.com/products/";
```

### Configure URL for Products API:
Open ./<your project folder>/clientapp/src/App.js
Edit the URL in the following line to include the correct server DNS name (or IP address) where you have deployed your Products API web service:
```
const apiUri = "http://<your-server>/api/products/";
```
For example:
```
const apiUri = "http://my-server-address.example.com/api/products/";
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
