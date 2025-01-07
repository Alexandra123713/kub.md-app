import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import api from '../../api/api';

export const CheckInButton = ({
	storeValue,
	nameValue,
	setStoreValue,
	setNameValue,
	reasonValue,
	setReasonValue,
}) => {
	const { t } = useTranslation();
	const handleCheckIn = async () => {
		if (storeValue && nameValue) {
			const storeId = storeValue.id;
			const newInformation = {
				name: nameValue,
				store_id: storeId,
				comment: reasonValue,
			};

			try {
				const response = await api.post('/checkin', newInformation);
				console.log('API Response:', response);
				toast.success(t('successCheckIn'), {
					position: 'bottom-right',
				});
				setStoreValue('');
				setNameValue('');
				setReasonValue('');
			} catch (error) {
				console.error('Eroare:', error.response?.data || error.message);
				toast.error(t('errorNameIncorrect'), {
					position: 'bottom-right',
				});
			}
		} else {
			toast.warn(t('warnSelectStoreAndName'), {
				position: 'bottom-right',
			});
		}
	};

	return (
		<>
			<Button onClick={handleCheckIn}>{t('checkIn')}</Button>
			<ToastContainer />;
		</>
	);
};

const Button = styled.button`
	background-color: #96c747;
	border-radius: 30px;
	width: 16rem;
	height: 5rem;
	display: block;
	margin: 14rem auto 0;
	font-size: 2rem;
	cursor: pointer;
	&:hover {
		background: #639d06;
	}

	@media (max-width: 425px) {
		background: #ccc;
		color: #666;
		cursor: not-allowed;
		pointer-events: none;
	}
`;
