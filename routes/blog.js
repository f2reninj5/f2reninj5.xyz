
const fn = require('f2reninj5')
const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {

	response.render('blog/main')
})

router.get('/posts/fetchpost', async (request, response) => {

	let row = (await fn.queryPool('SELECT * FROM blogs WHERE id = 1'))[0]

	response.render('blog/posts/fetchpost', {

		title: row.title,
		subtitle: row.subtitle,
		content: row.content
	})
})

module.exports = router