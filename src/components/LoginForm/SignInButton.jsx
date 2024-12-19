import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const SignInButton = () => {
	const { t } = useTranslation();
	return <Button>{t('login')}</Button>;
};

const Button = styled.button`
	background-color: #96c747;
	border-radius: 30px;
	width: 16rem;
	height: 5rem;
	display: block;
	font-size: 2rem;
	cursor: pointer;
`;
