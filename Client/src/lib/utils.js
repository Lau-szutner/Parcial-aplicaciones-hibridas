// utils.js
const getTokenFromCookies = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));
  return token ? token.split('=')[1] : null;
};

const fetchSpends = async () => {
  const token = getTokenFromCookies();

  if (!token) {
    return { data: null, error: 'Token no encontrado en las cookies' };
  }

  try {
    const response = await fetch('http://localhost:3000/spend/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los gastos');
    }

    const data = await response.json();
    const spends = data.filter((spend) => !spend.sharedEmail);

    return { data: spends, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Manejo de eliminación de un gasto
const DeleteSpend = async (id) => {
  const token = getTokenFromCookies();

  if (!token) {
    setError('Token no encontrado en las cookies');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/spend/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el gasto');
    }
    return { success: true, message: `Gasto eliminado ${id}` };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
// Manejo de edición de un gasto
const editSpend = async (id, updatedSpend) => {
  const token = getTokenFromCookies();

  if (!token) {
    setError('Token no encontrado en las cookies');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/spend/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
      },
      body: JSON.stringify(updatedSpend), // Envía los datos actualizados
    });

    if (!response.ok) {
      throw new Error('Error al editar el gasto');
    }

    const updatedSpendData = await response.json();

    return {
      success: true,
      message: `Gasto actualizado ${id},`,
      updatedSpend: updatedSpendData,
    };
  } catch (error) {
    return {
      message: `Error en la actualizacion del gasto ${id}`,
    };
  }
};

const getSpendsByMonth = async (year, month) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(
      `http://localhost:3000/spend/getSpendsByMonth?year=${year}&month=${month}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const spendsByMonthData = await response.json();

    // Calcular totales por categoría
    const totals = spendsByMonthData.reduce((acc, spend) => {
      acc[spend.category] = (acc[spend.category] || 0) + spend.amount;
      return acc;
    }, {});

    return totals;
  } catch (error) {
    console.log(error);
  }
};

const fetchSharedSpends = async () => {
  const token = getTokenFromCookies();

  if (!token) {
    setError('Token no encontrado en las cookies');
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/spend/getSharedSpends`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener los gastos');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

export {
  getTokenFromCookies,
  fetchSpends,
  DeleteSpend,
  editSpend,
  getSpendsByMonth,
  fetchSharedSpends,
};
