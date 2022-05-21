const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors')
dotenv.config();
//bring in routes
//const postRoutes = require('./routes/post')
//const {get} = require('./routes/post')//this is called Object destructuring
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB Connected'))

mongoose.connection.on('error',err=>{
    console.log(`DB Connection error: ${err.message}`);
})


const postRoutes = require('./routes/post')//this is called Object destructuring
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
//apiDocs
app.get('/',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs);
  })
})

// //own middle ware
// const myOwnMiddleware = (req,res,next) => {
//     console.log('middleware apploied!!!')
//     next();
// }



//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieparser());
app.use(expressValidator());
app.use(cors());
//app.use(myOwnMiddleware)
app.use('/',postRoutes);
app.use('/',authRoutes);
app.use('/',userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({'error':'Unauthorized'});
  }
});

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`A node js api listeing a port: ${port}`);
});

