import Spend from '../models/spendModel.js';

async function validateEmail(email) {
  if (!email) {
    throw new Error('email no proporcionado');
  }
}

async function getAllspendsByEmail(email) {
  const spends = await Spend.find({ email });
  if (spends.length === 0) {
    throw new Error('No se encontraron gastos');
  }
  return spends;
}

export { validateEmail, getAllspendsByEmail };
