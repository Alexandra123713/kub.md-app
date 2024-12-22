import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
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
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const handleLoginChange = (e) => {
		setLogin(e.target.value);
		console.log(login);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		console.log(password);
	};
	const togglePasswordVisibility = () => {
		setPasswordVisible((prevState) => !prevState);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (login && password) {
			try {
				const response = await api.post('http://funsport95.com/api/login', {
					email: login,
					password,
				});
				const token = response.data.token;
				localStorage.setItem('authToken', token);
				navigate('/results');
			} catch (error) {
				if (error.response && error.response.status === 401) {
					toast.error(t('errorLoginOrPassword'), {
						position: 'bottom-right',
					});
				} else {
					toast.error(t('errorServer'), {
						position: 'bottom-right',
					});
				}
			}
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
				<PasswordContainer>
					<SignInInput
						type={passwordVisible ? 'text' : 'password'}
						placeholder={t('adminPassword')}
						value={password}
						onChange={handlePasswordChange}></SignInInput>
					<EyeIcon onClick={togglePasswordVisibility}>
						{passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
					</EyeIcon>
				</PasswordContainer>
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
const PasswordContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;
const EyeIcon = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0.6rem;
	cursor: pointer;
	font-size: 1.2rem;
	color: gray;
	width: 20px;
	height: 20px;
`;
