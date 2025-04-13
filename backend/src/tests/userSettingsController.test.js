//Need mock
jest.mock('../../models/UserSettings');

//imports
const userSettingsController = require('../../controllers/userSettingsController');
const jwt = require('jsonwebtoken');
const UserSettings = require('../../models/UserSettings');
const { updateSettingsSchema, ratingSchema } = require('../../validations/userSettingsValidation');
const { rateMovie } = require('../../controllers/userSettingsController');


describe('userSettings', () => {

    //beforeEach function
    let req, res;
    beforeEach(() => {
        req = {
            user: {userId: '1'},
            params:{ movieId: '123'},
            body:{}            
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    //error 404
    it('should return 404 if user is not found', async () => {
        req.user = null;

        //declare req, res
        await userSettingsController.likeMovie(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
        error: 'User not found',
      });
    });

    //error 400
    it('should return error 400 if rating is invalid', async() => {
        req.user = 'mockUser';
        req.movieId = '123';

        await userSettingsController.rateMovie(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
              message: 'Invalid rating',
              errors: expect.any(Array),
            })
          );
    });
    /*happy scenario
    it('should return status 200 if updated successfully', async () => {
      const mockUpdated = {
        userId: '1',
        movieId: 123,
        isLiked: true,
        isSaved: false,
        rating: null,
      };
    
      req.user = { _id: '1' };
      req.params.movieId = '123';
    
      // Mock the findOneAndUpdate method
      UserSettings.findOneAndUpdate.mockResolvedValue(mockUpdated);
      
      await userSettingsController.likeMovie(req, res);
    
    
      // Debug log to inspect mock calls
      console.log('Mock calls:', UserSettings.findOneAndUpdate.mock.calls);
    
      expect(UserSettings.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: '1', movieId: 123 }, // movieId as number after parsing
        { $set: { isLiked: true } },
        { new: true, upsert: true }
      );
    
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ updated: mockUpdated });
    }); */
    
    });
