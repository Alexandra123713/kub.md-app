import { NavBar } from './NavBar';
import { SelectStoreAndName } from './Select';
import { CheckInButton } from './CheckInButton';

export const CheckInForm = () => {
  return (
    <div>
      <NavBar />
      <SelectStoreAndName />
      <CheckInButton />
    </div>
  );
};
