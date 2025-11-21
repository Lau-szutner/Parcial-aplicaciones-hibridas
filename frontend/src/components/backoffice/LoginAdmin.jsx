const LoginAdmin = () => {
  return (
    <form
      // onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
      className="bg-stone-700 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6  text-white w-full"
    >
      <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Iniciar sesion
      </button>
    </form>
  );
};

export default LoginAdmin;
