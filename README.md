## Angular Authentication with Node.js and JWT

### Structure of project: 
* begin creating a basic express server
* proceed with setting up Mongo DB 
* created a RESTFUL API. create api for user registration, login in and fetching regular and special events.
* Test Using Postman. 
* Angular app using Angular CLI.
    * generate new app using CLI
    * Add components and routing
    * Develop registration UI and Service
    * Develop login UI and service 
    * Develop events(regular, special) 
    * UI and Service(called backend api)
    * Add authentication(make sure users are logged in before being able to view the special events)
    * Login/logout buttons UI logic
* Authenticating the angular app.

~~~
    npm install -g @angular/cli
    ng --version  //check the version of CLI
    ng new appName
    ng serve
    ng g component folderName/componentName
    ng g service folderName/serviceName  
    
    npm init
    npm install express
    node server
~~~



npm install jsonwebtoken
use tokens for authentication, how I will be generating and verifying tokens in my app. The token I will be using contains JSON data and is called JSON web token.

header.payload.signature
payload is a userId in here;

jwt.sign(payload, secretKey, [options,callback])
The token then sent as a response to the front-end and the same token is sent back to the server with every subsequent request and to vertify the token sent back from the front-end, 
jwt.vertify(token, secretKey,[options,callback])

24：in the front-end, just check the existence of the token. I also have to verify the token in the backend to make sure it's valid.

for the server to vertify the token, we first need to send the token from the browser to the server.
achieved that us using angular HTTP interceptor. it intercepts outgoing HTTP requests and then transform them and then sends it to the server. The interceptor I will be implenting modify the request to cantain the token that is stored in the browser's local storage. IMPLEMENT token interceptor service in 25.

26: define the middleware to verify the JSON web token. A middleware is nothing but a function that gets executed before the user-defined handler is executed.


