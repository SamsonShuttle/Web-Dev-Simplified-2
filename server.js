if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express') // Import the Express framework
const app = express() // Create an Express application
const expressLayouts = require('express-ejs-layouts') // Import Express EJS Layouts for structuring HTML pages

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') // Set the view engine to EJS for rendering HTML
app.set('views', __dirname + '/views') // Tell Express where your HTML files (views) are located
app.set('layout', 'layouts/layout') // Set the default layout template for all pages

app.use(expressLayouts) // Use the EJS layouts middleware for better HTML structure
app.use(express.static('public')) // Make files in the "public" folder accessible to the browser

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000) // Start the server on the specified PORT (from environment variable) or default to 3000
