import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { AdminNavBar } from './AdminNavbar';
import api from '../../api/api';

export const Result = () => {
	const [tableData, setTableData] = useState([]);
	const [showTable, setShowTable] = useState(false);
	const [nameValue, setNameValue] = useState(null);
	const [nameOption, setNameOption] = useState(null);
	const [storesOptions, setStoresOptions] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const [totalDelay, setTotalDelay] = useState(null);
	const { t } = useTranslation();

	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	const storesDataAPI = async () => {
		try {
			const result = await api.get('/stores');
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

	const employeeDataAPI = async () => {
		try {
			const result = await api.get('/employees');
			const employeesForSelect = result.data;
			console.log(employeesForSelect);
			const employeeNameOptions = employeesForSelect.map((employee) => ({
				id: employee.id,
				value: employee.name,
				label: employee.name,
			}));
			employeeNameOptions.sort((a, b) => a.value.localeCompare(b.value));
			setNameOption(employeeNameOptions);
		} catch (error) {
			console.error('Error', error);
		}
	};

	useEffect(() => {
		employeeDataAPI();
	}, []);

	const handleNameChange = (selectedOption) => {
		setNameValue(selectedOption);
	};

	const handleGetInformation = async () => {
		if (!nameValue) {
			toast.warn(t('selectName'), {
				position: 'bottom-right',
			});
			return;
		}
		if (!startDate || !endDate) {
			toast.warn(t('selectInterval'), {
				position: 'bottom-right',
			});
			return;
		}
		const employeeId = nameValue.id;
		const dateFrom = startDate.toISOString().split('T')[0];
		const dateTo = endDate.toISOString().split('T')[0];

		try {
			const result = await api.get(
				`/late-checkins?date_from=${dateFrom}&date_to=${dateTo}&employee_id=${employeeId}`
			);

			console.log(result);

			const resultsForTable = result.data.data;
			console.log('result from api is:', resultsForTable);
			const totalDelay = result.data.total_minutes_late;

			const formattedTableData = resultsForTable.map((entry) => ({
				date: new Date(entry.start_time).toLocaleDateString('ro-RO', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
				}),
				entry: new Date(entry.start_time).toLocaleTimeString('ro-RO', {
					hour: '2-digit',
					minute: '2-digit',
				}),
				name: entry.employee.name,
				store: entry.store.name,
				comment: entry.comment,
				delay: entry.minutes_late,
			}));

			setTableData(formattedTableData);
			setTotalDelay(totalDelay);
			setShowTable(true);
		} catch (error) {
			console.error('Eroare:', error);
		}
	};

	return (
		<>
			<AdminNavBar />
			<ResultContainer>
				<FiltersContainer>
					<>
						<Select
							styles={{
								control: (baseStyles) => ({
									...baseStyles,
									width: '15rem',
									fontSize: '1.2rem',
									cursor: 'text',
								}),
								menu: (baseStyles) => ({
									...baseStyles,
									zIndex: '2',
								}),
							}}
							placeholder={t('selectName')}
							options={nameOption}
							value={nameValue}
							menuPlacement='bottom'
							onChange={handleNameChange}
							closeMenuOnSelect={true}
						/>
					</>
					<DatePicker
						selected={startDate}
						onChange={onChange}
						startDate={startDate}
						endDate={endDate}
						selectsRange
						inline
					/>
					<InformationButton onClick={handleGetInformation}>
						{t('information')}
					</InformationButton>
				</FiltersContainer>
				{showTable && (
					<Table>
						<thead>
							<tr>
								<TH>{t('date')}</TH>
								<TH>{t('hour')}</TH>
								<TH>{t('seller')}</TH>
								<TH>{t('store')}</TH>
								<TH style={{ width: '35%' }}>{t('reasonResult')}</TH>
								<TH>{t('delay')}</TH>
							</tr>
						</thead>
						<tbody>
							{tableData.map((result, index) => (
								<tr key={index}>
									<TD>{result.date}</TD>
									<TD>{result.entry}</TD>
									<TD>{result.name}</TD>
									<TD>{result.store}</TD>
									<TD style={{ width: '35%' }}>{result.comment}</TD>
									<TD
										style={{
											color: result.delay > 0 ? 'red' : '#000000',
										}}>
										{result.delay} {t('min')}
									</TD>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<TDFoot>{t('totalDelay')}</TDFoot>
								<TDFoot></TDFoot>
								<TDFoot></TDFoot>
								<TDFoot></TDFoot>
								<TDFoot></TDFoot>
								<TDFoot>
									{totalDelay} {t('min')}
								</TDFoot>
							</tr>
						</tfoot>
					</Table>
				)}
				<ToastContainer />
			</ResultContainer>
		</>
	);
};

const FiltersContainer = styled.div`
	margin: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 2rem;
`;

const InformationButton = styled.div`
	background-color: #96c747;
	border-radius: 30px;
	width: 14rem;
	display: block;
	font-size: 1.5rem;
	padding: 0.5rem;
	text-align: center;
	cursor: pointer;
	&:hover {
		background: #639d06;
	}
`;

const ResultContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const Table = styled.table`
	background-color: white;
	margin: 3rem;
	width: 100%;
`;

const TD = styled.td`
	background-color: #13e2e2;
	text-align: center;
	padding: 0.2rem;
`;

const TH = styled.th`
	background-color: gray;
	border: 1px solid black;
	padding: 0.4rem;
`;

const TDFoot = styled.td`
	background-color: orange;
	text-align: center;
`;
