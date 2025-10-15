import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

async function ensureUserDoesntExist(email) {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Usuario ya registrado');
  }
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function createUser(email, hashedPassword) {
  return await User.create({ email, password: hashedPassword });
}

async function createTokenUser(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '24h',
  });
}

async function findUser(email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`No existe un usuario con el mail ${email}`);
  }
  return user;
}

async function comparePassword(password, userPassword) {
  const isMatch = await bcrypt.compare(password, userPassword);
  if (!isMatch) {
    throw new Error('Credenciales incorrectas');
  }
  return true;
}

export {
  ensureUserDoesntExist,
  hashPassword,
  createUser,
  createTokenUser,
  findUser,
  comparePassword,
};
