// test/controllers/authController.test.js
const authController = require('../../controllers/authController');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../../validations/authValidation');

// Mocks
jest.mock('../../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe('register()', () => {
    it('should return 400 if validation fails', async () => {
      req.body = {}; // Invalid body
      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return 409 if user already exists', async () => {
      req.body = {
        login: 'testUser',
        password: 'testPass',
        firstName: 'Test',
        lastName: 'User'
      };
      User.findOne.mockResolvedValue({ login: 'testuser' });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
    });

    it('should create a new user and return token', async () => {
      req.body = {
        login: 'TestUser',
        password: 'Password123',
        firstName: 'Test',
        lastName: 'User'
      };
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({
        firstName: 'Test',
        lastName: 'User',
        _id: 'mockedUserId'
      });
      jwt.sign.mockReturnValue('mockedToken');

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        firstName: 'Test',
        lastName: 'User',
        token: 'mockedToken'
      });
    });
  });

  describe('login()', () => {
    it('should return 401 if user not found', async () => {
      req.body = { login: 'ghost', password: 'nopass' };
      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should return 401 if password does not match', async () => {
      req.body = { login: 'test', password: 'wrongpass' };
      User.findOne.mockResolvedValue({ login: 'test', password: 'hashed' });
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should return token if login succeeds', async () => {
      req.body = { login: 'test', password: 'correctpass' };
      User.findOne.mockResolvedValue({
        login: 'test',
        password: 'hashed',
        firstName: 'Test',
        lastName: 'User',
        _id: 'userId'
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockedToken');

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        firstName: 'Test',
        lastName: 'User',
        token: 'mockedToken'
      });
    });
  });
});
