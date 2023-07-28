import UserModel from '../models/user.schema.js';

// Endpoint para Actualizar los datos del usuario (nombres y apellidos)
const userUpdateDataController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token
    const { name, lastName } = req.body; // Obtiene los valores del body

    /* Buscar en la BD por el user.id, si no hay un usuario con ese id, 
       responde un codigo de estado 401 y mensaje de no autorizado.
       user contiene el verify y id el token*/
    const existingUserById = await UserModel.findById(user.id).exec();
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });

    // le asigna al usuario encontrado su nuevo nombre y apellido 
    existingUserById.name = name;
    existingUserById.lastName = lastName;

    await existingUserById.save(); // Si todo sale bien guarda el usuario con sus nuevos valores

    return res.status(200).send('Usuario actualizado');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
  
};

export default userUpdateDataController;