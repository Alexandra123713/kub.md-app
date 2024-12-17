import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { LoginButton } from './LoginButton';
import { Link } from 'react-router-dom';
import { Languages } from '../Languages';

export const NavBar = () => {
	return (
		<NavBarContainer>
			<Link to='/'>
				<Logo
					src={logo}
					alt='logo'
				/>
			</Link>
			<LanguageAndLoginContainer>
				<Languages />
				<Link
					to='/login'
					style={{ textDecoration: 'none' }}>
					<LoginButton />
				</Link>
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

const LanguageAndLoginContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`;
