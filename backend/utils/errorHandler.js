export function handleGetSpendsByEmailError(error, res) {
  const message = error.message;
  if (error.message.includes('email no proporcionado')) {
    return res.status(400).json({ message: error.message });
  }
  if (error.message.includes('no se encontraron gastos')) {
    return res.status(404).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Error interno del servidor.' });
}

export function handleGetSpendsByMonthError(error, res) {
  const message = error.message;

  if (message.includes('email no proporcionado')) {
    return res.status(400).json({ message });
  }

  if (message.includes('email inválido')) {
    return res.status(400).json({ message });
  }

  if (message.includes('no hay fechas')) {
    return res.status(400).json({ message });
  }

  if (message.includes('No se encontraron gastos')) {
    return res.status(404).json({ message });
  }

  return res.status(500).json({ message: 'Error interno del servidor.' });
}

export function handleCreateSpendError(error, res) {
  const message = error.message;
  if (error.message.includes('El email y categoria son obligatorios')) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Error interno del servidor.' });
}

export function handleEditSpendByIdError() {
  return res.status(500).json({ message: 'Error al editar el gasto' });
}
