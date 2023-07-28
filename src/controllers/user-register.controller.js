import UserModel from '../models/user.schema.js'; // Modelo de la BD
import { hash } from 'bcrypt'; // modulo que permite encriptar la contraseña con su metodo hash
import { SALT } from '../constants/salt.js'; // Constante que contiene el numero de rounds que va a aplicar el hash

// Endpoint que crea un nuevo usuario
const userRegisterController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { _id, name, lastName, email, password } = req.body; // obtener los valores del body

    /* Buscar en la BD por el _id, si ya existe un usuario con ese _id, 
       responde un codigo de estado 409 (Conflict) y mensaje de que ya hay 
       un usuario con ese _id */
    const existingUserById = await UserModel.findById(_id).exec();
    if (existingUserById) 
      return res
        .status(409)
        .send({ errors: ['Ya existe un usuario con ese id registrado'] });

    /* Buscar en la BD por el email, si ya existe un usuario con ese email, 
       responde un codigo de estado 409 (Conflict) y mensaje de que ya hay 
       un usuario con ese email */    
    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (existingUserByEmail) 
      return res
        .status(409)
        .send({ errors: ['Ya existe un usuario con ese email registrado'] });

    const hashedPassword = await hash(password, SALT); // metodo hash para encriptar la contraseña
  
    const user = new UserModel({ // instancia los valores del documento que se quiere insertar
      _id,
      name,
      lastName,
      email,
      password: hashedPassword // se le asigna la contraseña hasheada
    });

    await user.save(); // Si todo sale bien, Guarda el usuario

    return res.status(201).send('Usuario registrado con éxito');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
};

export default userRegisterController; // exporta el endpoint