
const fn = require('f2reninj5')
const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {

	response.render('blog/main')
})

router.get('/posts/fetchpostdetails', async (request, response) => {

	let posts = await fn.queryPool('SELECT id, title, subtitle, created_at, views FROM blogs ORDER BY created_at DESC')

	response.render('blog/posts/fetchpostdetails', {

		posts: posts
	})
})

router.get('/posts/:id', (request, response) => {

	response.send(request.params.id)
})

module.exports = router