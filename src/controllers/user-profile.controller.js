import UserModel from '../models/user.schema.js';

// Endpoint que obtiene el usuario
const userProfileController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token

    /* Buscar en la BD por el user.id, si no hay un usuario con ese id, 
       responde un codigo de estado 401 y mensaje de no autorizado.
        user contiene el verify y id el token*/
    const existingUserById = await UserModel.findById(user.id);
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });
  
    const { _id, name, lastName, email } = existingUserById;

    return res.status(200).send({ _id, name, lastName, email }); 
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
};

export default userProfileController;