import jwt from 'jsonwebtoken';

// Funcion que crea o firma el token
const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, 
      process.env.JWT_PRIVATE_KEY, 
      { expiresIn: '7d' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export default createAccessToken;