const SharedSpend = ({
  title,
  description,
  amount,
  categoria,
  createdAt,
  email,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-sm">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <h3 className="text-sm text-gray-500">{createdAt}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-gray-600 mt-2 font-medium">
        Compartido con: {email}
      </p>{' '}
      {/* Nuevo campo de correo compartido */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500 text-sm">Monto:</span>
        <span className="text-green-600 font-bold text-2xl">${amount}</span>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <span>Categoría: </span>
        <span className="font-semibold">{categoria}</span>
      </div>
    </div>
  );
};

export default SharedSpend;
