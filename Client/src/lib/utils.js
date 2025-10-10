// utils.js
const getTokenFromCookies = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));

  return token
    ? token.split('=')[1]
    : { data: null, error: 'Token no encontrado en las cookies' };
};

const getAllSpends = async () => {
  const token = getTokenFromCookies();
  try {
    const response = await fetch('http://localhost:3000/spend/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener todos los gastos');
    }

    const data = await response.json();
    const spends = data.filter((spend) => !spend.sharedEmail);
    return { data: spends, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

const deleteSpendsById = async (id) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`http://localhost:3000/spend/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
const editSpendById = async (id, updatedSpend) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`http://localhost:3000/spend/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedSpend),
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
      message: `Error al actualizar el gasto ${id}`,
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
      throw new Error(
        `No se encontraron gastos en el mes ${month} y año ${year}`
      );
    }

    const spendsByMonthData = await response.json();

    const totals = spendsByMonthData.reduce((acc, spend) => {
      acc[spend.category] = (acc[spend.category] || 0) + spend.amount;
      return acc;
    }, {});

    return totals;
  } catch (error) {
    console.log(error);
  }
};

const getSharedSpends = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(
      `http://localhost:3000/spend/getSharedSpends`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`No se encontraron gastos para ese mes `);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export {
  getTokenFromCookies,
  getAllSpends,
  deleteSpendsById,
  editSpendById,
  getSpendsByMonth,
  getSharedSpends,
};
