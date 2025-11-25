const Welcome = ({ onChoose }) => {
  return (
    <div className="max-w-md text-center bg-stone-700 p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a Spend Tracker</h1>
      <p className="mb-6">
        Crea una cuenta para empezar a llevar el control de tus gastos o inicia
        sesión si ya tienes una.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
          onClick={() => onChoose('register')}
        >
          Crear cuenta
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          onClick={() => onChoose('login')}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Welcome;
