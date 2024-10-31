import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export const LoginNavBar = () => {
  return (
    <NavBarContainer>
      <Link to='/'>
        <Logo
          src={logo}
          alt='logo'
        />
      </Link>
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
