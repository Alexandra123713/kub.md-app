import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const SelectStoreAndName = ({
	storeValue,
	setStoreValue,
	nameValue,
	setNameValue,
	reasonValue,
	setReasonValue,
}) => {
	const { t } = useTranslation();
	const [storesOptions, setStoresOptions] = useState([]);

	const storesDataAPI = async () => {
		try {
			const result = await axios.get('http://funsport95.com/api/stores');
			const storesData = result.data.data;
			const options = storesData.map((store) => ({
				id: store.id,
				value: store.opening_time,
				label: store.name,
			}));
			options.sort((a, b) => a.label.localeCompare(b.label));
			setStoresOptions(options);
		} catch (error) {
			console.error('Error', error);
		}
	};
	useEffect(() => {
		storesDataAPI();
	}, []);

	const handleStoreChange = (selectedOption) => {
		setStoreValue(selectedOption);
	};

	const handleNameChange = (event) => {
		setNameValue(event.target.value);
	};
	const handleReasonChange = (event) => {
		setReasonValue(event.target.value);
	};

	return (
		<SelectContainer>
			<SelectWrapper>
				<Select
					styles={{
						control: (baseStyles) => ({
							...baseStyles,
							fontSize: '1.2rem',
							cursor: 'text',
							padding: '1rem',
						}),
						container: (baseStyles) => ({
							...baseStyles,
							width: '100%',
						}),
					}}
					placeholder={t('storeSelect')}
					isSearchable={true}
					value={storeValue}
					options={storesOptions}
					menuPlacement='bottom'
					onChange={handleStoreChange}
				/>
			</SelectWrapper>
			<NameInput
				type='text'
				placeholder={t('name')}
				value={nameValue}
				onChange={handleNameChange}
			/>
			<ReasonInput
				type='text'
				placeholder={t('reason')}
				value={reasonValue}
				onChange={handleReasonChange}
			/>
		</SelectContainer>
	);
};

const SelectContainer = styled.form`
	display: flex;
	justify-content: space-around;
	margin: 16rem auto 0rem;

	@media (max-width: 500px) {
		flex-direction: column;
		gap: 3rem;
		align-items: center;
		width: 100%;
		margin: 10rem auto 0rem;
	}
`;

const SelectWrapper = styled.div`
	width: 25%;

	@media (max-width: 500px) {
		width: 80%;
	}
`;

const NameInput = styled.input`
	font-family: 'Times New Roman', Times, serif;
	font-size: 1.2rem;
	padding: 0.8rem;
	border: none;
	border-radius: 4px;
	width: 30%;
	box-sizing: border-box;

	@media (max-width: 500px) {
		padding: 2.2rem;
		width: 80%;
	}
`;

const ReasonInput = styled.input`
	font-family: 'Times New Roman', Times, serif;
	font-size: 1.2rem;
	padding: 0.8rem;
	border: none;
	border-radius: 4px;
	width: 25%;
	box-sizing: border-box;

	@media (max-width: 500px) {
		padding: 2.2rem;
		width: 80%;
	}
`;
