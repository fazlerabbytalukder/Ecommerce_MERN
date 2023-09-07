# ECommerce MERN Project

## Basic Setup
1. Environemnt Setup
2. Express Server Setup
3. Create Express Server
4. HTTP recquest and Response
5. nodemon and morgan package

## Install
1. npm i express
2. npm i --save-dev  nodemon
3. 
const express = require("express");
const app = express();

app.get("/test", (req, res) => {
    res.status(200).send({
        message:'api is working fine',
    })
})

app.get("/products", (req, res) => {
    res.status(200).send({
        message:'Products are returned',
    })
})

app.listen(3001, () => {
    console.log(`server is running at http://localhost:3001`);
});
4. inside package.json
"scripts": {
    "start":"node ./src/server.js",
    "dev":"nodemon ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
5. And start the server with npm run dev
6. For the test server inside the terminal
install: npm i --save-dev morgan
now you can see the request type nad other info in the terminal
7. npm i body-parser
8. for error handle: npm i http-errors
9. for limit request: npm i express-rate-limit
10. for env istall: npm i dotenv
11. for database connection: npm i mongoose
12. for Password bcrypt: npm i bcrypt

##### process to router set
1. route define in app.js
//route define
app.use('/api/users',userRouter);

2. in router folder method write
//GET: api/users
userRouter.get("/", getusers);
userRouter.get("/:id", getuser);

3. then controllter-> userController handle functionatiality. Here sometimes needs models->userModel (mongoose).

4. So the array is app.js->router(userRouter.js)->controller(userController.js)->model(userModel.js)

