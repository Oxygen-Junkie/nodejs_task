import dotenv from 'dotenv'
dotenv.config()
import { Dialect } from 'sequelize/types'

export default {
	HOST: process.env.DB_HOST ? process.env.DB_HOST : '',
	USER: process.env.DB_USER ? process.env.DB_USER : '',
	PASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
	DB: process.env.DB_NAME ? process.env.DB_NAME : '',
	dialect: process.env.DIALECT as Dialect,
	pool: {
		max: 20,
		min: 0,
		acquire: 60000,
		idle: 10000,
	},
}
