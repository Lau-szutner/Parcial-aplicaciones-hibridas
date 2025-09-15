// components/UnderConstruction.jsx
function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen bg-stone-950">
      <h1 className="text-4xl font-bold mb-4">Página en construcción</h1>
      <p className="text-lg mb-6">
        ¡Estamos trabajando en esto! Vuelve más tarde.
      </p>
      <div className="w-24 h-24 bg-blue-500 animate-spin rounded-full"></div>
      <div className="mt-6">
        <svg
          className="w-16 h-16 text-yellow-500"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      </div>
    </div>
  );
}

export default UnderConstruction;
