import { useState } from 'react';

const Login = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedEmail = Cookies.get('email');
    setToken(savedToken || null);
    setEmail(savedEmail || null);
  }, []);

  return (
    <div>
      <RegisterForm setEmail={setEmail} setToken={setToken} />
    </div>
  );
};

export default Login;
