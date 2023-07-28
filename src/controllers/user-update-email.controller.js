import UserModel from '../models/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { user } = req; // user esta guardado en req y contiene el verify del token
    const { email, password } = req.body;

    const existingUserById = await UserModel.findById(user.id).exec();
    if (!existingUserById) 
      return res.status(401).send({ errors: ['Usuario no autorizado'] });

    const checkPassword = await compare(password, existingUserById.password);
    if (!checkPassword) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    existingUserById.email = email;

    await existingUserById.save();

    return res.status(200).send('Email del usuario actualizado');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
  
};

export default userUpdateEmailController;