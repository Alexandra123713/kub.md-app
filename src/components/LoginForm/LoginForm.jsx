import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginNavBar } from './LoginNavBar';
import { SignInButton } from './SignInButton';

export const LoginForm = () => {
  const data = {
    login: 'admin',
    password: '123456789',
  };

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    console.log(login);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleFormSubmit = () => {
    if (login && password) {
      if (login === data.login && password === data.password) {
        alert('Autentificare reusita');
        navigate('/results');
      } else alert('Login sau parola gresite');
    } else alert('Introdu login-ul si parola');
  };

  return (
    <>
      <LoginNavBar />
      <FormContainer onSubmit={handleFormSubmit}>
        <SignInInput
          type='text'
          placeholder='Enter login'
          value={login}
          onChange={handleLoginChange}
        />
        <SignInInput
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={handlePasswordChange}
        />
        <SignInButton />
      </FormContainer>
    </>
  );
};

const FormContainer = styled.form`
  margin: 16rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 20rem;
  gap: 4rem;
`;

const SignInInput = styled.input`
  width: 16rem;
  height: 3rem;
  padding: 0 1rem;
`;
