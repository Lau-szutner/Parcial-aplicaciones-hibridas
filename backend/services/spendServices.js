import Spend from '../models/spendModel.js';

export async function validateEmail(email) {
  if (!email) {
    throw new Error('email no proporcionado');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(`email inválido: ${email}`);
  }
}

export function validateDateParams(year, month) {
  if (!year || !month) {
    throw new Error('no hay fechas');
  }

  if (isNaN(year) || isNaN(month)) {
    throw new Error('Los parámetros de fecha deben ser numéricos.');
  }

  if (month < 1 || month > 12) {
    throw new Error('El mes debe estar entre 1 y 12.');
  }
}

export function buildDateRange(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  return { startDate, endDate };
}

export async function getAllspendsByEmail(email) {
  const spends = await Spend.find({ email });

  if (!spends.length) {
    throw new Error('No se encontraron gastos');
  }

  return spends;
}

export async function findSpendsByDateRange(email, startDate, endDate) {
  return await Spend.find({
    email,
    createdAt: { $gte: startDate, $lt: endDate },
  }).sort({ createdAt: 1 });
}

export async function getSpendsByDate(email, year, month) {
  validateDateParams(year, month);

  const { startDate, endDate } = buildDateRange(year, month);
  const spends = await findSpendsByDateRange(email, startDate, endDate);

  if (!spends.length) {
    throw new Error('No se encontraron gastos para ese mes.');
  }

  return spends;
}

export async function validateNewSpend(email, category) {
  if (!email || !category) {
    throw new Error('El email y categoria son obligatorios');
  }
}

export async function loadNewSpendData(
  title,
  amount,
  description,
  category,
  email,
  sharedWith,
  userId
) {
  const newSpend = new Spend({
    title,
    userId,
    amount,
    description,
    category,
    email,
    sharedWith: sharedWith || null,
    createdAt: new Date(),
  });

  const savedSpend = await newSpend.save();
  return savedSpend;
}

export async function findSpendByIdAndUpdate(
  id,
  title,
  amount,
  description,
  category,
  sharedWith
) {
  const updatedSpend = await Spend.findByIdAndUpdate(id, {
    title,
    amount,
    description,
    category,
    sharedWith: sharedWith || null,
  });

  return updatedSpend;
}
