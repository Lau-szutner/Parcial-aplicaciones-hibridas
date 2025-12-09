const LoginAdmin = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
}) => {
  return (
    <form
      onSubmit={handleLogin}
      className="bg-stone-700 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6 text-white w-full"
    >
      <h2 className="text-2xl font-semibold">Iniciar Sesión - Back office</h2>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginAdmin;
