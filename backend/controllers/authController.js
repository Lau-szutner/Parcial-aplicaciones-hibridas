import {
  ensureUserDoesntExist,
  hashPassword,
  createUser,
  createTokenUser,
  findUser,
  comparePassword,
} from '../services/userServices.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await ensureUserDoesntExist(email);

    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword);
    const token = await createTokenUser(user);

    res.status(201).json({ token });
  } catch (error) {
    if (error.message.includes('ya registrado')) {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUser(email);
    await comparePassword(password, user.password);

    const token = await createTokenUser(user);
    res.status(200).json({ token });
  } catch (error) {
    if (error.message.includes('Credenciales incorrectas')) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes('No existe')) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const loginAdminUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUser(email);
    await comparePassword(password, user.password);

    const token = await createTokenUser(user);
    res.status(200).json({ token });
  } catch (error) {
    if (error.message.includes('Credenciales incorrectas')) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes('No existe')) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', { path: '/' });
    res.clearCookie('email', { path: '/' });
    res.clearCookie('selectedMonth', { path: '/' });
    res.setHeader('Authorization', '');

    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error('Error al realizar el logout:', error);
    res.status(500).json({ message: 'Error al realizar el logout' });
  }
};
