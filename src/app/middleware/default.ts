
import path from 'path'
import express from 'express'
import e from 'express'
import cookieParser from 'cookie-parser'

export default function configure(app: e.Express): void {

    app.enable('trust proxy')

    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, '../views'))

    app.use(cookieParser())

    app.use(express.static(path.resolve(__dirname, '../public')))

    app.use((request, response, next) => {

        response.locals.partialsDir = path.resolve(__dirname, '../views/partials')

        next()
    })
}
