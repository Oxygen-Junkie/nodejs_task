import { Express } from 'express'
import {
	getHistory,
	logEvent,
} from '../controllers/history.controller'


export default function (app: Express) {

	app.put(
		'/history/',
		logEvent
	)

	app.get(
		'/history/',
		getHistory
	)
}
