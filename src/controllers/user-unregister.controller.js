import UserModel from '../models/user.schema.js';
import { compare } from 'bcrypt';

// Endpoint para eliminar un usuario
const userUnregisterController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token
    const { password } = req.body; // Obtiene el valor de la contraseña del body

    /* Buscar en la BD por el user.id, si no hay un usuario con ese id, 
       responde un codigo de estado 401 y mensaje de no autorizado.
       user contiene el verify y id el token*/
    const existingUserById = await UserModel.findById(user.id).exec();
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });

    /* Compara la contraseña ingresada con la del usuario buscado anteriormente
      por su id en la base de datos para eliminar el usuario, 
      si las contrseñas no son iguales responde con un error */    
    const checkPassword = await compare(password, existingUserById.password);
    if (!checkPassword) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    await existingUserById.deleteOne(); // Si todo sale bien Elimina el usuario

    return res.status(200).send('Usuario eliminado');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
};

export default userUnregisterController;