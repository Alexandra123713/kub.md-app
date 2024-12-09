import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { LoginButton } from './LoginButton';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ruFlag from '../../assets/ru-flag.png';
import roFlag from '../../assets/ro-flag.png';

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <NavBarContainer>
      <Link to='/'>
        <Logo
          src={logo}
          alt='logo'
        />
      </Link>
      <LanguageAndLoginContainer>
        <Link
          to='/login'
          style={{ textDecoration: 'none' }}>
          <LoginButton />
        </Link>
        <LanguageContainer>
          <LanguageButton onClick={() => changeLanguage('ru')}>
            RU <FlagLogo src={ruFlag} />
          </LanguageButton>
          <LanguageButton onClick={() => changeLanguage('ro')}>
            RO <FlagLogo src={roFlag} />
          </LanguageButton>
        </LanguageContainer>
      </LanguageAndLoginContainer>
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
const FlagLogo = styled.img`
  width: 1rem;
`;
const LanguageAndLoginContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
