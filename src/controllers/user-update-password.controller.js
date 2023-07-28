import UserModel from '../models/user.schema.js';
import { compare, hash } from 'bcrypt';
import { SALT } from '../constants/salt.js';

const userUpdatePasswordController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token
    const { oldPassword, newPassword } = req.body; // requiere la vieja y nueva contraseña

    /* Buscar en la BD por el user.id, si no hay un usuario con ese id, 
       responde un codigo de estado 401 y mensaje de no autorizado.
       user contiene el verify y id el token*/
    const existingUserById = await UserModel.findById(user.id).exec();
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });

    /* Compara la contraseña vieja ingresada con la del usuario buscado anteriormente
      por su id en la base de datos, si la contrseña no es igual responde con un error */   
    const checkPassword = await compare(oldPassword, existingUserById.password);
    if (!checkPassword) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });
    
    const hashedPassword = await hash(newPassword, SALT); // metodo hash para encriptar la nueva contraseña
    existingUserById.password = hashedPassword;// Le asigna al usuario encontrado la nueva contraseña

    await existingUserById.save(); // Si todo sale bien guarda la nueva contraseña

    return res.status(200).send('Contraseña del usuario actualizada');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
};

export default userUpdatePasswordController;