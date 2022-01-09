
const fn = require('f2reninj5')
const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {

	response.render('blog/main')
})

router.get('/posts/postlist', async (request, response) => {

	try {

		let posts = await fn.Blog.fetchBlogPosts()

		response.render('blog/posts/postlist', {

			posts: posts

		})

	} catch (err) {

		console.log(err)
		response.send(err)
	}
	
})

router.get('/posts/:id', async (request, response) => {

	try {

		let post = await fn.Blog.fetchBlogPost(request.params.id)

		response.render('blog/posts/post', {

			post: post
		})

	} catch (err) {

		console.log(err)
		response.send(err)
	}
})

module.exports = router