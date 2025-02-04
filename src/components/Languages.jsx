import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ruFlag from '../assets/ru-flag.png';
import roFlag from '../assets/ro-flag.png';

export const Languages = () => {
	const { t, i18n } = useTranslation();
	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};
	return (
		<LanguageContainer>
			<LanguageButton onClick={() => changeLanguage('ru')}>
				RU <FlagLogo src={ruFlag} />
			</LanguageButton>
			<LanguageButton onClick={() => changeLanguage('ro')}>
				RO <FlagLogo src={roFlag} />
			</LanguageButton>
		</LanguageContainer>
	);
};

const LanguageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const LanguageButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.2rem;
	font-size: 1rem;
	@media (max-width: 600px) {
		font-size: 0.5rem;
	}
`;

const FlagLogo = styled.img`
	width: 1rem;
	@media (max-width: 600px) {
		width: 0.5rem;
	}
`;
