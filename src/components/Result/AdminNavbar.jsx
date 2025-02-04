import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { Languages } from '../Languages';
import { useTranslation } from 'react-i18next';

export const AdminNavBar = () => {
	const { t } = useTranslation();

	return (
		<NavBarContainer>
			<Link to='/'>
				<Logo
					src={logo}
					alt='logo'
				/>
			</Link>
			<NavItemAndLanguagesContainer>
				<NavItemContainer>
					<LinkWrapper>
						<StyledLink to='/results'>{t('delayNav')}</StyledLink>
					</LinkWrapper>
					<LinkWrapper>
						<StyledLink to='/employees'>{t('employees')}</StyledLink>
					</LinkWrapper>
					<LinkWrapper>
						<StyledLink to='/stores'>{t('stores')}</StyledLink>
					</LinkWrapper>
				</NavItemContainer>
				<Languages />
			</NavItemAndLanguagesContainer>
		</NavBarContainer>
	);
};

const NavBarContainer = styled.div`
	background: #db0e82;
	padding: 1rem 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
`;

const Logo = styled.img`
	width: 12.5rem;
	height: 3.75rem;

	@media (max-width: 600px) {
		width: 7rem;
		height: auto;
	}
	@media (max-width: 400px) {
		width: 5rem;
		height: auto;
	}
`;

const StyledLink = styled(NavLink)`
	color: #ffffff;
	text-decoration: none;
	font-size: 1.4rem;
	font-family: sans-serif;
	@media (max-width: 600px) {
		font-size: 1rem;
	}
	@media (max-width: 400px) {
		font-size: 0.7rem;
	}
	&.active {
		font-size: 1.4rem;
		font-family: sans-serif;
		font-weight: bold;
		color: #ffffff;
		border-bottom: 1px solid #ffffff;
		@media (max-width: 600px) {
			font-size: 1rem;
		}
		@media (max-width: 400px) {
			font-size: 0.7rem;
		}
	}
`;
const LinkWrapper = styled.div`
	text-align: center;
	width: 10rem;
	@media (max-width: 600px) {
		width: 6rem;
	}
	@media (max-width: 400px) {
		width: 4rem;
	}
`;
const NavItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4rem;

	@media (max-width: 1000px) {
		gap: 2rem;
	}

	@media (max-width: 600px) {
		gap: 0.2rem;
	}
	@media (max-width: 400px) {
		gap: 0.6rem;
	}
`;

const NavItemAndLanguagesContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10rem;

	@media (max-width: 1000px) {
		gap: 5rem;
	}
	@media (max-width: 600px) {
		gap: 2rem;
	}
`;
