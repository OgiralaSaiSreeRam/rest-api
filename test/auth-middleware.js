const expect = require('chai').expect;
const jwt=require('jsonwebtoken')
const sinon=require('sinon')

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function() {
  it('should throw an error if no authorization header is present', function() {
    const req = {
      get: function(headerName) {
        return null;
      }
    };
    //mocha will run this and check if an error is being thrown
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw( //this is not thrwoing an error, it is only checking if an error is being thrown or not.
      'Not authenticated.'
    );
  });
  
  
  it('should throw an error if the authorization header is only one string', function() {
    const req = {
      get: function(headerName) {
        return 'xyz';
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();  // will throw an error because we cannot perform a split operation when the authHeader is only one string long
  });
  
  it('should throw an error if user id is not assigned to req',function(){
    
    const req={
      get: function(headerName){
        return 'Bearer jsgvghgsdvfdhwgghwghfeg' //overriding the get function to return something
      }
    }

    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true; //checks if called or not
    jwt.verify.restore(); //now the next check can pass if at all the condition satisfied

  })

  it('should throw an error if the token cannot be verified', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer xyz'; //xyz is an invalid token even when there is no token, hence it throws an error
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(); // this test passes because it was unable to verify 
  });

});
