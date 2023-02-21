const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: "cse341-personal-qj62.onrender.com",
  schemes: ['https'],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

//    const ui = SwaggerUI({...})
// // Method can be called in any place after calling constructor SwaggerUIBundle
// ui.initOAuth({
//     clientId: "your-client-id",
//     clientSecret: "your-client-secret-if-required",
//     realm: "your-realms",
//     appName: "your-app-name",
//     scopeSeparator: " ",
//     scopes: "openid profile",
//     additionalQueryStringParams: {test: "hello"},
//     useBasicAuthenticationWithAccessCodeGrant: true,
//     usePkceWithAuthorizationCodeGrant: true
//   })

swaggerAutogen(outputFile, endpointsFiles, doc);