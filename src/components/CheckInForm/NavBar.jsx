import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { LoginButton } from './LoginButton';

export const NavBar = () => {
  return (
    <NavBarContainer>
      <Logo
        src={logo}
        alt='logo'
      />
      <LoginButton />
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  background: #db0e82;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 200px;
  height: 60px;
`;
