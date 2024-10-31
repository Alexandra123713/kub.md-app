import { useState } from 'react';
import { NavBar } from './NavBar';
import { SelectStoreAndName } from './Select';
import { CheckInButton } from './CheckInButton';

export const CheckInForm = () => {
  const [storeValue, setStoreValue] = useState(null);
  const [nameValue, setNameValue] = useState(null);
  return (
    <div>
      <NavBar />
      <SelectStoreAndName
        storeValue={storeValue}
        setStoreValue={setStoreValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
      />
      <CheckInButton
        storeValue={storeValue}
        nameValue={nameValue}
      />
    </div>
  );
};
