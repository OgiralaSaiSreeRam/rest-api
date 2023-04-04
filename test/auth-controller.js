const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose=require('mongoose')
const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function() { 
  //passing done as an arguement will explicitly tell mocha to wait till done is executed and will allow you to test on async code

  before(function(done) {
    mongoose
      .connect(
          'mongodb+srv://sreeramogirala:xetroq-wivVym@cluster0.zkqhhtn.mongodb.net/test-messages'
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
          _id: '5c0f66b979af55031b34728a'
        });
        return user.save();
      })
      .then(() => {
        done();
      })
      .catch(err=>{
        done(err)
      });
  });

  beforeEach(function() {});

  afterEach(function() {});


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
  after(function(done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      })
      .catch(err=>{
        done(err)
      });
    });
});
