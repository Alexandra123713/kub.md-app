import styled from 'styled-components';
import { LoginNavBar } from './LoginNavBar';
import { SignInButton } from './SignInButton';

export const LoginForm = () => {
  return (
    <>
      <LoginNavBar />
      <FormContainer>
        <SignInInput
          type='text'
          placeholder='Enter login'
        />
        <SignInInput
          type='text'
          placeholder='Enter passwort'
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
