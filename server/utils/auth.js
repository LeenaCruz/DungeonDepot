const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
console.log("Texting the headers:", req.headers)
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req
      // {user: null} 
    }

    try {
      const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = authenticatedPerson;
      // return {user: authenticatedPerson};
    } catch {
      console.log('Invalid token');
      // return {user: null};
      return req
    }

  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
