import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

async function ensureUserDosentExist(email) {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('Usario ya registrado');
  }
}

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function createUser(email, hashedPassword) {
  const user = await User.create({ email, password: hashedPassword });
  return user;
}

async function createTokenUser(user, email) {
  const token = jwt.sign({ id: user._id, email: email }, JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
}

export { hashPassword, ensureUserDosentExist, createUser, createTokenUser };
