
import express, { request, response } from 'express'
import configure from './middleware/default'

const app = express()
configure(app)

app.get('/', async (request, response) => {

    return response.render('home/main')
})

app.get('/pirate', async (request, response) => {

    return response.render('pirate/main')
})

export default app
