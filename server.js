const express = require('express');
const bodyParser= require('body-parser')
const path = require('path');

const app = express();

// Setup server port
const port = process.env.PORT || 5000;

//Override default view engine.
app.set('view engine', 'ejs');

//Override default view path.
app.set("views", path.resolve("./app/views"));
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get('/', (req, res) => {    
    res.json({"error" : false, "message" : "Hello Amalay! How are you?"});
});

require('./app/routes/authRoutes')(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});