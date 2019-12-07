const {User} = require('../../../models/users');
const jwt = require('jsonwebtoken');
const config = require('config');
const momgoose = require('mongoose');
describe('User.generateAuthToken', () => {
    it('Should return a valid JWT', ()=> {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const token =  user.generateAutheToken();
        const decoded = jwt.vefify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })

})