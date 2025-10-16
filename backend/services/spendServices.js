import Spend from '../models/spendModel.js';

async function validateEmail(email) {
  if (!email) {
    throw new Error(`email no proporcionado ${email}`);
  }
}

async function getAllspendsByEmail(email) {
  const spends = await Spend.find({ email });
  if (spends.length === 0) {
    throw new Error('No se encontraron gastos');
  }
  return spends;
}

async function getSpendsByDate(email, year, month) {
  if (!year || !month) {
    throw new Error('no hay fechas');
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const spends = await Spend.find({
    email: email,
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  }).sort({ createdAt: 1 });

  if (!spends.length) {
    throw new Error('No se encontraron gastos para ese mes.');
  }

  return spends;
}

export { validateEmail, getAllspendsByEmail, getSpendsByDate };
