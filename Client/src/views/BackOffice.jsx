import TotalUsers from '../components/backoffice/TotalUsers';
import LoginAdmin from '../components/backoffice/LoginAdmin';
import { useState, useEffect } from 'react';
import { isAdminUser } from '../lib/utils';
const backOffice = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userAdmin = async () => {
      try {
        const data = await isAdminUser();
        console.log(data);
      } catch (error) {}
    };

    userAdmin();
  }, []);

  return (
    <div>
      {isAdmin == true ? <TotalUsers></TotalUsers> : <LoginAdmin></LoginAdmin>}
    </div>
  );
};

export default backOffice;
