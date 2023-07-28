import UserModel from '../models/user.schema.js';
import { compare } from 'bcrypt'; // De bcrypt importa el metodo compare
import createAccessToken from '../constants/jwt.js'; // Función de creacion del token

// Endpoint que permite Iniciar sesión
const userLoginController = async (req, res) => {
  try { // Bloque de instrucciones a intentar
    const { email, password } = req.body; // obtener los valores del body

    /* Busca un usuario por su email en la base de datos para iniciar sesión, 
      si no hay un usuario con ese email responde con un error */
    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (!existingUserByEmail) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    /* Compara la contraseña ingresada con la del usuario buscado anteriormente
      por su email en la base de datos para iniciar sesión, 
      si las contrseñas no son iguales responde con un error */  
    const checkPassword = await compare(password, existingUserByEmail.password);
    if (!checkPassword) 
      return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    // como payload se le asigna el id del usuario existente y encontrado por su email en la BD  
    const token = await createAccessToken({ id: existingUserByEmail._id }); 
    res.cookie('token', token); // responde al metodo cookie con el token

    return res.status(200).send('Inicio de sesión exitoso');
  } catch (error) { // respuesta si se produce un error
    return res.status(500).send({ errors: error.message });
  }
  
};

export default userLoginController;