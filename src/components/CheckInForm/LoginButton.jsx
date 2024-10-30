import styled from 'styled-components';
import logo from '../../assets/login-logo.png';

export const LoginButton = () => {
  return (
    <Button type='submit'>
      Login
      <ButtonLogo
        src={logo}
        alt='login-logo'
      />
    </Button>
  );
};

const Button = styled.button`
  width: 200px;
  height: 60px;
  background-color: #292929;
  color: white;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: none;
  cursor: pointer;
`;
const ButtonLogo = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
