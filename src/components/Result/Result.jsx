import { LoginNavBar } from '../LoginForm/LoginNavBar';
import { Link } from 'react-router-dom';

export const Result = () => {
  return (
    <>
      <Link to='/'>
        <LoginNavBar />
      </Link>
    </>
  );
};
