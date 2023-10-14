import { Request, Response } from 'express'
import History from '../models/history.model'

export const getHistory = (request: unknown, response: unknown) => {
	
	const req = request as Request
	const res = response as Response

	const where = req.params.id ? { userId: Number.parseInt(req.params.id) } : undefined
	const page = req.params.page ? Number.parseInt(req.params.page) : 1
	const limit = 5
	const offset = limit * (page - 1)
	
	History.findAll({
		where,
		limit,
		offset,
	}).then(value => {
		if (value) {
			const result = value.map(val => {
				return { id: val.userId, login: val.login, event: val.event, date: val.createdAt }
			})
			return res.status(200).send(result)
		} else {
			return res.status(500).send({ message: 'Данные не найдены' })
		}
	}).catch(() => {
		return res.status(500).send({ message: 'Не удалось получить историю пользователя' })
	})
}

export const logEvent = (request: unknown, response: unknown) => {
	
	const req = request as Request
	const res = response as Response

	const userId = req.body.id
	const login = req.body.login
	const event = req.body.event
	
	History.create({
		userId,
		login,
		event
	}).then(value => {
		if (value) {
			return res.status(200).send({ message: 'Записть о действеях пользователя добавлена успешно' })
		} else {
			return res.status(500).send({ message: 'Не удалось добавить запись в историю действий пользователя' })
		}
	}).catch(() => {
		return res.status(500).send({ message: 'Не удалось добавить запись в историю действий пользователя' })
	})
}