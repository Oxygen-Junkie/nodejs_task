const bcrypt = require("bcryptjs");
const db = require("../models");
const historyService = require("../config/bridge");
const User = db.user;


exports.create = (req, res) => {
	if (!req.body || !req.body.login || !req.body.password || !req.body.email) {
		return res.status(500).send({
			message: 'Поля не могут быть пустыми'
		});
	}

	User.create({
		login: req.body.login,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then((user) => {
			historyService.postData(user.id, user.login, 'Пользователь создан');
	}).catch((err) => {
		console.log(err.message);
		return res.status(500).send({ message: 'Не удалось создать пользователя' });
	})
}

exports.update = (req, res) => {
	const id = req.params.id;

	if (!req.body) {
		return res.status(500).send({
			message: 'Поля не могут быть пустыми',
		});
	}

	User.findOne({
		where: {
			id
		}
	}).then((user) => {
			if (user) {

				let actionName = 'Данные пользователя (';
				const userData = {};

				if (req.body.password) {
					actionName += ' пароль';
					userData.password = bcrypt.hashSync(req.body.password, 8);
				}

				if (req.body.email) {
					if (req.body.password) actionName += ','
					actionName += ' адрес электронной почты';
					userData.email = req.body.email;
				}

				if (req.body.login) {
					if (req.body.password || req.body.email) actionName += ',';
					actionName += ' логин';
					userData.login = req.body.login;
				}

				actionName += ') изменены';

				user.update(userData);

				historyService.postData(user.id, user.id, actionName);

				return res.status(200).send({ message: 'Данные пользователя изменены' });

		}}).catch(() => {
			return res.status(500).send({ message: 'При изменении произошла ошибка' });
		})
}

exports.getUserList = (req, res) => {
	
	User.findAll()
		.then((users) => {
			if (users) {
				const result = users.map((val) => {
					return { id: val.id, login: val.login };
				});
				return res.status(200).send(result);

			} else {
				return res.status(200).send({ message: 'Список пользователей пуст' });
			}}).catch(() => {
				return res.status(500).send({ message: 'Произошла ошибка' });
			})
}