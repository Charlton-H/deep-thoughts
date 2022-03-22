const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // signToken expects user obj-- will add to the token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // secret merely enables the server to verify whether it recognizes this token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if no token, return request obj as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request objet
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return updated request object
    return req;
  },
};
