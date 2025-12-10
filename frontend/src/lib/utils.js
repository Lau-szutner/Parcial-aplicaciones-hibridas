const API_URL = import.meta.env.VITE_API_URL;

// === TOKEN ===
const getTokenFromCookies = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));

  return token
    ? token.split('=')[1]
    : { data: null, error: 'Token no encontrado en las cookies' };
};

// === GET SPENDS ===
const fetchAllSpends = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/getSpendsByEmail`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'No se encontraron gastos');
    }

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// === CREATE SPEND ===
const createSpend = async (data) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al crear el gasto');
    }

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// === DELETE SPEND ===
const deleteSpendById = async (id) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/${id}`, {
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

// === EDIT SPEND ===
const editSpendById = async (id, updatedSpend) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/${id}`, {
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
      message: `Gasto actualizado ${id}`,
      updatedSpend: updatedSpendData,
    };
  } catch (error) {
    return {
      message: `Error al actualizar el gasto ${id}`,
    };
  }
};

// === GET SPENDS BY MONTH ===
const getSpendsByMonth = async (year, month) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(
      `${API_URL}/spend/getSpendsByMonth?year=${year}&month=${month}`,
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

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// === GET SHARED SPENDS ===
const getSharedSpends = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/getSharedSpends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`No se encontraron gastos compartidos`);
    }

    return await response.json();
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

// === GET SHARED WITH ME ===
const fetchSharedSpendsWithMe = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/getSharedSpendsWithMe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`No se encontraron gastos compartidos contigo`);
    }

    return await response.json();
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

// === ADMIN: USERS ===
const getAllUsers = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/backOffice/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`No se encontraron usuarios`);
    }

    return await response.json();
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

const deleteUser = async (id) => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(
      `${API_URL}/backOffice/users/deleteUser/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`No se encontraron usuarios`);
    }

    return await response.json();
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

// === ADMIN CHECK ===
const isAdminUser = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/auth/backOffice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`No hay credenciales válidas`);
    }

    return await response.json();
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

// === GET ALL SPENDS (ADMIN) ===
const getAllSpends = async () => {
  const token = getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/spend/getAllSpends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'No se pudieron obtener los gastos');
    }

    return await response.json();
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export {
  createSpend,
  getTokenFromCookies,
  fetchAllSpends,
  deleteSpendById,
  editSpendById,
  getSpendsByMonth,
  getSharedSpends,
  fetchSharedSpendsWithMe,
  getAllUsers,
  deleteUser,
  isAdminUser,
  getAllSpends,
};
