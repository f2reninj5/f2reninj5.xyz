
const fn = require('f2reninj5')
const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {

	response.render('blog/main')
})

router.get('/posts/fetchpostlist', async (request, response) => {

	let posts = await fn.queryPool(`SELECT id, title, subtitle, views, created_at FROM blogs ORDER BY created_at DESC`)

	response.render('blog/posts/fetchpostlist', {

		posts: posts
	})
})

router.get('/posts/:id', async (request, response) => {

	try {

		let postId = parseInt(request.params.id)

		if (Number.isNaN(postId)) {

			throw 'non-integer post id was given'
		}

		let post = (await fn.queryPool(`SELECT id, title, subtitle, content, views, created_at FROM blogs WHERE id = ${postId}`).catch(err => {

			console.log(err)
			throw 'something went wrong when querying the database'

		}))[0]

		if (!post) {

			throw `failed to find post with id ${postId}`
		}

		response.render('blog/posts/post', {

			post: post
		})

	} catch (err) {

		response.send(err)
		return
	}
})

module.exports = router