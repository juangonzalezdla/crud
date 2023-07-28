const userLogoutController = async (req, res) => {
  res.cookie('token', '', { // Vacia el token
    expires: new Date(0)
  });

  return res.status(200).send('Cierre de sesión exitoso');
};

export default userLogoutController;