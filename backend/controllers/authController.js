import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

// Registro de usuario
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
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

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

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
    // También puedes asegurarte de que no haya ningún encabezado Authorization
    res.setHeader('Authorization', '');

    // Responder con éxito
    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error('Error al realizar el logout:', error);
    res.status(500).json({ message: 'Error al realizar el logout' });
  }
};
