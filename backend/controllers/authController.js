import User from '../models/userModel.js';

import {
  ensureUserDosentExist,
  hashPassword,
  createUser,
  createTokenUser,
} from '../services/userServices.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await ensureUserDosentExist(email);

    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword);
    const token = createTokenUser(user, email);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = createTokenUser(user, email);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Logout de usuario
export const logoutUser = (req, res) => {
  try {
    // Limpiar el token de las cookies
    res.clearCookie('token', { path: '/' });
    res.clearCookie('email', { path: '/' });
    res.clearCookie('selectedMonth', { path: '/' });
    // También puedes asegurarte de que no haya ningún encabezado Authorization
    res.setHeader('Authorization', '');

    // Responder con éxito
    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error('Error al realizar el logout:', error);
    res.status(500).json({ message: 'Error al realizar el logout' });
  }
};
