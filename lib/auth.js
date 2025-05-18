import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePasswords = (plainText, hash) => {
  return bcrypt.compareSync(plainText, hash);
};

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
