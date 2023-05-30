
import app from './app/index'
import { port } from './etc/app.json'

const server = app.listen(port, () => {

    console.log(`Listening on http://127.0.0.1:${port}`)
})
