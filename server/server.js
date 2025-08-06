require('dotenv').config({debug: true});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();

//middleware

app.use(express.json());  // is a line of middleware in an Express.js application that tells the app to automatically parse incoming requests with JSON payloads.
/**  explainationfor above line of code.
 * app - This is your Express application instance.
 .use() – This is how you register middleware in Express. Middleware are functions that run before your route handlers.
 express.json() – This is a built-in middleware function in Express (since v4.16.0) that:

 Parses incoming requests where the Content-Type is application/json

 Converts the JSON string in the body into a JavaScript object

 Stores it in req.body */
app.use(express.urlencoded({ extended: true })); // for forms

app.use(cors({
    origin: ['http://localhost:3000', 'https://neetachavan-dev.vercel.app'], // replace with your actual frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));  /** This line tells your Express app to use the cors middleware (from the cors package).

It enables all origins (*) by default, meaning any frontend or client can access your API. */

/**app.get('/', (req, res) => {
    console.log('GET request received at /');
    res.send('hello from server');
});   /** This defines a GET route for the root URL (/) of your server.

When someone accesses your server via a browser or a tool like Postman at http://localhost:<your-port>/, the server will respond with: "hello from server"*/




// File upload
app.use(fileUpload({ useTempFiles: true }));


// Connect to MongoDB
const URI = process.env.MONGO_URL;
async function connectDB() {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB connected! [${process.env.NODE_ENV || 'development'}]`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
connectDB();

// Routes
app.use('/', require('./routes/aboutRoute'));
app.use('/', require('./routes/educationRoute'));
app.use('/', require('./routes/experienceRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/', require('./routes/projectRoute'));
app.use('/', require('./routes/uploadRoute'));
app.use('/contact', require('./routes/contactRoute'));


// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Something went wrong!', error: err.message });
});


const PORT = process.env.PORT || 4000;


// Prevent caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
}); 


app.listen(PORT, ()=> {
    console.log(`server listening on port: ${PORT}`);
} ) // This starts your Express server and tells it to listen for incoming requests on the specified port (PORT).
