const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function() { 
  //passing done as an arguement will explicitly tell mocha to wait till done is executed
  it('should throw an error with code 500 if accessing the database fails', function(done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'testing'
      }
    };

    AuthController.login(req, {}, () => {}).then(result => {
      // console.log(result);
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    })
    .catch(err=>{
      done(err)
    });

    User.findOne.restore(); //executed after done()

  });
});
