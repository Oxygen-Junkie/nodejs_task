const controller = require("../app/controllers/user.controller");
describe('update', () => {

    it('Должено не выдать ошибку при указании только пароля', () => {
        const req = {
          params: {
            id: '1'
          },
          body: {
            password: 'newpassword'
          }
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
  
        controller.update(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Данные пользователя изменены' });
      });

      it('Должно изменить несколько полей', () => {
        const req = {
          params: {
            id: '1'
          },
          body: {
            password: 'newpassword',
            email: 'newemail@example.com',
            login: 'newlogin'
          }
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
  
        controller.update(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Данные пользователя изменены' });
      });
  
      it('Должно вернуть ошибку, когда не переданны никакие даные ', () => {
        const req = {
          params: {
            id: '1'
          },
          body: {}
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
  
        controller.update(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Поля не могут быть пустыми' });
      });  
});

describe('create', () => {

  it('Должно вернуть сообщение об успехе, когда пользователь создан успешно', () => {
    const req = {
      body: {
        login: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'Пользователь создан' });
  });

  it('Должно вернуть сообщение об ошибке, когда логин не указан в запросе', () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Поля не могут быть пустыми' });
  });


  it('Должно вернуть сообщение об ошибке, когда данные не переданы', () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Поля не могут быть пустыми' });
  });
});
    
describe('getUserList', () => {
    
  it('Должно вернуть список пользователей', () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    
    controller.getUserList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([{ id: 1, login: 'user1' }, { id: 2, login: 'user2' }]);
  });
  
  it('Должно вернуть статус 500, когда произошла ошибка', () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        send: jest.fn()
      };

      User.findAll = jest.fn(() => Promise.reject());

      controller.getUserList(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Произошла ошибка' });
    });
});