import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginNavBar } from './LoginNavBar';
import { SignInButton } from './SignInButton';

export const LoginForm = () => {
	const { t } = useTranslation();
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

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (login && password) {
			if (login === data.login && password === data.password) {
				navigate('/results');
			} else
				toast.error(t('errorLoginOrPassword'), {
					position: 'bottom-right',
				});
		} else
			toast.warn(t('warnLoginOrPassword'), {
				position: 'bottom-right',
			});
	};

	return (
		<>
			<LoginNavBar />
			<FormContainer onSubmit={handleFormSubmit}>
				<SignInInput
					type='text'
					placeholder={t('adminLogin')}
					value={login}
					onChange={handleLoginChange}
				/>
				<SignInInput
					type='password'
					placeholder={t('adminPassword')}
					value={password}
					onChange={handlePasswordChange}
				/>
				<SignInButton />
				<ToastContainer />
			</FormContainer>
		</>
	);
};

const FormContainer = styled.form`
	margin: 6rem auto;
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
