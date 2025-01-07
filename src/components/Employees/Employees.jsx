import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { AdminNavBar } from '../Result/AdminNavbar';
import { useTranslation } from 'react-i18next';
import api from '../../api/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Employees = () => {
	const { t } = useTranslation();
	const [employees, setEmployees] = useState([]);
	const [newEmployeeName, setNewEmployeeName] = useState('');

	const employeeDataAPI = async () => {
		try {
			const result = await api.get('/employees');
			const employeesForList = result.data;
			employeesForList.sort((a, b) => a.name.localeCompare(b.name));
			setEmployees(employeesForList);
		} catch (error) {
			console.error('Error', error);
		}
	};

	const handleDelete = async (employeeId) => {
		try {
			await api.delete(`/employees/${employeeId}`);
			setEmployees((prev) =>
				prev.filter((employee) => employee.id !== employeeId)
			);
			toast.success(t('employeeDeleted'), {
				position: 'bottom-right',
			});
		} catch (error) {
			toast.error(t('errorDeleting'), {
				position: 'bottom-right',
			});
		}
	};

	const handleDeleteWithConfirm = (employeeId, employeeName) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<ModalContainer>
						<p>
							{t('areYouSureDelete')}{' '}
							<span style={{ fontWeight: 'bold' }}>{employeeName}</span>{' '}
							{t('fromList')}?
						</p>
						<div>
							<ConfirmButton
								onClick={() => {
									handleDelete(employeeId);
									onClose();
								}}>
								{t('confirm')}
							</ConfirmButton>
							<CancelButton onClick={onClose}>{t('cancel')}</CancelButton>
						</div>
					</ModalContainer>
				);
			},
		});
	};

	const handleAddEmployee = async () => {
		if (!newEmployeeName) {
			toast.warn(t('name'), {
				position: 'bottom-right',
			});
			return;
		}
		try {
			const newEmployee = {
				name: newEmployeeName,
			};
			const response = await api.post('/employees', newEmployee);
			await employeeDataAPI();
			setNewEmployeeName('');
			console.log('New employee added:', response.data);
		} catch (error) {
			console.error('Error adding new employee:', error);
		}
	};

	useEffect(() => {
		employeeDataAPI();
	}, []);

	return (
		<>
			<AdminNavBar />
			<TableAndFormContainer>
				<AddEmployeeForm>
					<Input
						type='text'
						placeholder={t('enterName')}
						value={newEmployeeName}
						onChange={(e) => setNewEmployeeName(e.target.value)}
					/>
					<AddButton onClick={handleAddEmployee}>{t('addEmployee')}</AddButton>
				</AddEmployeeForm>
				<Table>
					<thead>
						<tr>
							<TH></TH>
							<TH>{t('employeesList')}</TH>
							<TH>{t('deleteEmployee')}</TH>
						</tr>
					</thead>
					<tbody>
						{employees.map((employee, index) => (
							<tr key={employee.id}>
								<TD>{index + 1}</TD>
								<TD>{employee.name}</TD>
								<DeleteTD>
									<DeleteContainer>
										<div>
											{`${t('delete')} `}
											<strong>{employee.name}</strong>
											{` ${t('fromList')}`}
										</div>

										<DeleteButton
											onClick={() =>
												handleDeleteWithConfirm(employee.id, employee.name)
											}
										/>
									</DeleteContainer>
								</DeleteTD>
							</tr>
						))}
					</tbody>
				</Table>
			</TableAndFormContainer>
			<ToastContainer />
		</>
	);
};
const TableAndFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3rem;
	margin: 3rem 16rem;
`;
const Table = styled.table`
	background-color: #292929;
	width: 100%;
	border-radius: 4px;
`;

const TH = styled.th`
	font-size: 1.2rem;
	background-color: gray;
	padding: 0.4rem;
`;

const TD = styled.td`
	background-color: #e7e7e7;
	text-align: center;
	padding: 0.2rem;
`;
const DeleteTD = styled.td`
	background-color: #e7e7e7;
	text-align: center;
	align-items: center;
	padding: 0.2rem;
`;

const DeleteButton = styled(MdDeleteForever)`
	padding: 0;
	font-size: 2rem;
	cursor: pointer;
	border-radius: 30px;
	color: #fe6d6d;
	&:hover {
		color: #d13434;
	}
`;
const DeleteContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 0 3rem;
`;

const AddEmployeeForm = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
	align-self: flex-start;
`;

const Input = styled.input`
	padding: 1rem;
	margin: 0.5rem 0;
	font-size: 0.8rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 23rem;
	background-color: #e7e7e7;
`;

const AddButton = styled.button`
	font-size: 1rem;
	background: #96c747;
	color: #080808;
	border: 2px solid black;
	padding: 1rem;
	cursor: pointer;
	border-radius: 30px;

	&:hover {
		background: #639d06;
	}
`;

const ConfirmButton = styled.button`
	background-color: #96c747;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	font-size: 16px;

	&:hover {
		background-color: #639d06;
	}
`;

const CancelButton = styled.button`
	background-color: #fe6d6d;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	font-size: 16px;
	margin-left: 10px;

	&:hover {
		background-color: #d13434;
	}
`;

const ModalContainer = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	width: 300px;
	text-align: center;
	box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
	position: relative;
`;
