const mysql = require('../MySQL')

module.exports = {

    BlogPost: require('./BlogPost'),

    async fetchBlogPost(id) {

        id = parseInt(id)

		if (Number.isNaN(id)) {

			throw 'non-integer post id was given'
		}

        let rows = await mysql.queryPool('SELECT blogs.*, tags.id as tag_id, tags.name as tag_name FROM blogs LEFT JOIN blog_tags ON blogs.id = blog_tags.blog_id LEFT JOIN tags ON blog_tags.tag_id = tags.id WHERE blogs.id = ?', [id]).catch(err => {

			console.log(err)
			throw 'something went wrong when querying the database'
		})

        if (rows.length < 1) {

			throw `failed to find post with id ${id}`
		}

        return new this.BlogPost(rows)
    },

    async fetchBlogPosts() {

        let rows = await mysql.queryPool('SELECT blogs.*, tags.id as tag_id, tags.name as tag_name FROM blogs LEFT JOIN blog_tags ON blogs.id = blog_tags.blog_id LEFT JOIN tags ON blog_tags.tag_id = tags.id  ORDER BY created_at DESC').catch(err => {

			console.log(err)
			throw 'something went wrong when querying the database'
		})
        
        let posts = []

        if (rows.length < 1) {

			return posts
		}

        for (row of rows) {

            // check if last element in posts is part of the same post
            if (posts.length > 0 && posts[posts.length - 1][0].id == row.id) {

                posts[posts.length - 1].push(row)

            } else {

                posts.push([row])
            }
        }

        for (i = 0; i < posts.length; i ++) {

            posts[i] = new this.BlogPost(posts[i])
        }

        return posts
    }
}