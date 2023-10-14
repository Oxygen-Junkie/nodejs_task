import { getHistory, logEvent } from '../app/controllers/history.controller'

describe('getHistory', () => {

	it('Должно вернуть список действий пользователя со статусом 200, когда подан правельный userId и номер страницы', () => {
	
		const req = {
			params: {
				id: '1',
				page: '1'
			}
		}
		const res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn()
		}
        
		getHistory(req, res)
		
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith([
			{
				id: 1,
				login: 'testUser',
				event: 'testEvent',
				date: '2021-01-01'
			},
			{
				id: 1,
				login: 'testUser',
				event: 'testEvent',
				date: '2021-01-02'
			}
		])
	})
    
    
    
	it('Должно вернуть статус 500 и сообщение о невозможности получить историю, когда произошла ошибка', () => {
		const req = { params: { id: -1 } }
		const res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn()
		}
    
		getHistory(req, res)
    
		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith({ message: 'Не удалось получить историю пользователя' })
	})
    
    
})


describe('logEvent', () => {
	it('Должен вернуть сообщение об успехе, когда запись добавлена успешно', () => {
		const req = {
			body: {
				id: 1,
				login: 'testUser',
				event: 'testEvent'
			}
		}
		const res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn()
		}
  
		logEvent(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ message: 'Записть о действеях пользователя добавлена успешно' })
	})
  
  
	it('Должен вернуть ошибку, когда произошла ошибка', () => {
		const req = {
			body: {
				id: -1,
				login: 'testUser',
				event: 'testEvent'
			}
		}
		const res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn()
		}
  
		logEvent(req, res)
		
		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith({ message: 'Не удалось добавить запись в историю действий пользователя' })
	})
  
})