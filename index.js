
// https://youtu.be/AryZSCeKU9Y

const path = require('path')
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use((request, response, next) => {

	response.locals.partialsDir = path.resolve(__dirname, './views/partials')
	next()
})

app.set('view engine', 'ejs')

app.get('/', (request, response) => {

	response.render('home')
})

app.post('/', (request, response) => {

	console.log('Post')
	response.render('home')
})

app.get('/projects', (request, response) => {

	response.render('projects')
})

app.use('/blog', require('./routes/blog'))

app.get('/contact', (request, response) => {

	response.render('contact')
})

app.get('/about', (request, response) => {

	response.render('about')
})

let server = app.listen(80, () => {

	console.log(`Listening at http://localhost.`)
})