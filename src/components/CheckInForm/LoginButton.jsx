import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import logo from '../../assets/login-logo.png';

export const LoginButton = () => {
  const { t } = useTranslation();
  return (
    <Button type='submit'>
      {t('login')}
      <ButtonLogo
        src={logo}
        alt='login-logo'
      />
    </Button>
  );
};

const Button = styled.button`
  padding: 0.7rem 1rem;
  background-color: #292929;
  color: white;
  font-size: 1.8rem;
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
