import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

export const protect = async (req, res, next) => {
  let token;

  // Verifica si el token está en los encabezados de la solicitud (Authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Obtener el token de los encabezados
      token = req.headers.authorization.split(' ')[1];

      // Verificar la validez del token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Agregar el token decodificado a la solicitud para referencia
      console.log('Token decodificado:', decoded);

      // Buscar al usuario usando el email del token
      req.user = await User.findOne({ email: decoded.email }).select(
        '-password'
      );

      if (!req.user) {
        console.log('Usuario no encontrado:', decoded.email);
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      // Si todo está bien, continuar con la siguiente función
      next();
    } catch (error) {
      console.error('Error en la verificación del token:', error);
      return res.status(401).json({
        message: 'No autorizado, token inválido',
        error: error.message,
      });
    }
  } else {
    // Si no se pasa el token en los encabezados, devolver error
    return res.status(401).json({ message: 'No autorizado, falta token' });
  }
};
