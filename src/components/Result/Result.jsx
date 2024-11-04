import { useEffect, useState } from 'react';
import { LoginNavBar } from '../LoginForm/LoginNavBar';

export const Result = () => {
  const [information, setInformation] = useState(null);
  useEffect(() => {
    const savedInformation = localStorage.getItem('information');
    if (savedInformation) {
      setInformation(JSON.parse(savedInformation));
    }
  }, []);

  const handleGetInformation = () => {
    if (information) {
      information.forEach((info) => {
        const name = info.name;
        const delay = info.delay;
        const date = info.date;
        console.log({ name, delay, date });
      });
    } else console.log('error');
  };
  return (
    <>
      <LoginNavBar />

      <button onClick={handleGetInformation}>Information</button>
    </>
  );
};
