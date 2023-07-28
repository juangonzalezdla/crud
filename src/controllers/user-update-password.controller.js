import UserModel from '../models/user.schema.js';
import { compare, hash } from 'bcrypt';
import { SALT } from '../constants/salt.js';

const userUpdatePasswordController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token
    const { oldPassword, newPassword } = req.body;

    const existingUserById = await UserModel.findById(user.id).exec();
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });

    const checkPassword = await compare(oldPassword, existingUserById.password);
    if (!checkPassword) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });
    
    const hashedPassword = await hash(newPassword, SALT);
    existingUserById.password = hashedPassword;

    await existingUserById.save();

    return res.status(200).send('Contraseña del usuario actualizada');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
};

export default userUpdatePasswordController;