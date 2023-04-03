const expect = require('chai').expect;

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
});
