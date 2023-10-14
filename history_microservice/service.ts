/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import sequelize from './app/models'

import history from './app/routes/history.routes'

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
	console.info(`${req.method} ${req.url}`)
	next()
})

history(app)

const PORT = process.env.PORT || 8082
app.listen(PORT, async () => {
	await sequelize.sync( { force: true } )
	console.log(`Сервис истории действий с пользователями запущен на порту ${PORT}.`)
})