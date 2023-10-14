import config from '../config/db.config'
import { Sequelize } from 'sequelize-typescript'
import History from './history.model'
import { OperatorsAliases } from 'sequelize'

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: 0 as unknown as OperatorsAliases,

	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
})

sequelize.addModels([History])

export default sequelize
