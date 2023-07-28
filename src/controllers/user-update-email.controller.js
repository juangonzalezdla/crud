import UserModel from '../models/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token
    const { email, password } = req.body;

    /* Buscar en la BD por el user.id, si no hay un usuario con ese id, 
       responde un codigo de estado 401 y mensaje de no autorizado.
       user contiene el verify y id el token*/
    const existingUserById = await UserModel.findById(user.id).exec();
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });

    /* Compara la contraseña ingresada con la del usuario buscado anteriormente
      por su id en la base de datos para actualizar el email, 
      si la contrseña no es igual responde con un error */   
    const checkPassword = await compare(password, existingUserById.password);
    if (!checkPassword) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    existingUserById.email = email; // Le asigna al usuario encontrado el nuevo email

    await existingUserById.save(); // Si todo sale bien guarda el usuario con su nuevo email

    return res.status(200).send('Email del usuario actualizado');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
  
};

export default userUpdateEmailController;