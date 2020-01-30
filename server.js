const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const app = express();
const port = 5600;

//Db Configuration (saving the connection string to a variable 'db')
const db = require('./config/keys').mongoURI;

//Connect to mongoDB using mongoose through 'db'
mongoose
    .connect(db)
    //PromiseStatements   
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));
   
//FirstRoute
app.get('/', (req, res) => res.send('Hello World'));

//UsersRoute-Use Route: Whenever users comes to this address the router will take it to another JS file
app.use("/api/users", users);
//ProfileRoute
app.use("/api/profile", profile);
//PostsRoute
app.use("/api/post", post);

app.listen(port, () => console.log(`Server running on port ${port}`));