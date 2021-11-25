
// https://colorhunt.co/palette/4205167d1935b42b51e63e6d
// https://youtu.be/AryZSCeKU9Y

const express = require('express')
const app = express()

app.use(express.static('public'))

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

app.get('/blog', (request, response) => {

	response.render('blog')
})

app.get('/contact', (request, response) => {

	response.render('contact')
})

app.get('/about', (request, response) => {

	response.render('about')
})

let server = app.listen(3000, () => {

	console.log('Listening at http://localhost:3000.')
})