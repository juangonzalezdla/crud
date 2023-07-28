import jwt from 'jsonwebtoken'; // modulo que permite ña creacion de tokens

// Permite verificar si el usuario tiene el token
const userJWTDTO = async (req, res, next) => {
  const { token } = req.cookies; // obtiene de las cookies el token

  if (!token) return res 
    .status(401)
    .send({ errors: ['Usuario no autorizado'] }); // si no hay token responde el error

  // Verifica el token y para saber que el remitente es quien dice ser en este caso user  
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
      if (error) return res
        .status(401)
        .send({ errors: ['Usuario no autorizado'] });

      req.user = user;

      next();
  });
}

export default userJWTDTO;