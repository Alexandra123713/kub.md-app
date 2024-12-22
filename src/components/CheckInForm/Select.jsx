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
}) => {
	const { t } = useTranslation();
	const [storesOptions, setStoresOptions] = useState([]);

	const storesDataAPI = async () => {
		try {
			const result = await axios.get('http://funsport95.com/api/stores');
			const storesData = result.data.data;
			console.log(storesData);
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
		console.log(`Selected option is ${selectedOption}`);
		setStoreValue(selectedOption);
		console.log(`Selected option is ${storeValue}`);
	};

	const handleNameChange = (event) => {
		setNameValue(event.target.value);
	};

	return (
		<SelectContainer>
			<Select
				styles={{
					control: (baseStyles) => ({
						...baseStyles,
						fontSize: '1.4rem',
						cursor: 'text',
						padding: '1rem',
					}),
					container: (baseStyles) => ({
						...baseStyles,
						width: '25%',
					}),
				}}
				placeholder={t('storeSelect')}
				isSearchable={true}
				value={storeValue}
				options={storesOptions}
				menuPlacement='bottom'
				onChange={handleStoreChange}
			/>
			<NameInput
				type='text'
				placeholder={t('name')}
				value={nameValue}
				onChange={handleNameChange}
			/>
			<ReasonInput
				type='text'
				placeholder={t('reason')}
			/>
		</SelectContainer>
	);
};

const SelectContainer = styled.form`
	display: flex;
	justify-content: space-around;
	margin: 16rem auto 0rem;
`;

const NameInput = styled.input`
	font-family: 'Times New Roman', Times, serif;
	font-size: 1.4rem;
	padding: 0.8rem;
	border: none;
	border-radius: 4px;
	width: 25%;
	box-sizing: border-box;
	&::placeholder {
		white-space: pre-wrap;
	}
	@media (max-width: 1024px) {
		font-size: 1rem;
	}
`;

const ReasonInput = styled.input`
	font-family: 'Times New Roman', Times, serif;
	font-size: 1.4rem;
	padding: 0 0.8rem;
	border: none;
	border-radius: 4px;
	width: 25%;
	@media (max-width: 1024px) {
		font-size: 1rem;
	}
`;
