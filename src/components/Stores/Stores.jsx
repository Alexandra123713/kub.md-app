import { AdminNavBar } from '../Result/AdminNavbar';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Stores = () => {
	const { t } = useTranslation();
	const [stores, setStores] = useState([]);
	const [newStore, setNewStore] = useState('');
	const [newStoreAdress, setNewStoreAdress] = useState('');
	const [newOpeningTime, setNewOpeningTime] = useState('');

	const storeDataAPI = async () => {
		try {
			const result = await api.get('/stores');
			const resultData = result.data;
			const storesForList = resultData.data;
			storesForList.sort((a, b) => a.name.localeCompare(b.name));
			setStores(storesForList);
		} catch (error) {
			console.error('Error', error);
		}
	};
	useEffect(() => {
		storeDataAPI();
	}, []);

	const handleAddStore = async () => {
		if (!newStore && !newStoreAdress && !newOpeningTime) {
			toast.warn(t('name'), {
				position: 'bottom-right',
			});
			return;
		}
		try {
			const timeParts = newOpeningTime.split(':');
			const formattedTime =
				parseInt(timeParts[0]) * 100 + parseInt(timeParts[1]);

			const newStoreData = {
				name: newStore,
				address: newStoreAdress,
				opening_time: formattedTime,
			};
			await api.post('/stores', newStoreData);
			await storeDataAPI();
			setNewStore('');
			setNewStoreAdress('');
			setNewOpeningTime('');
			toast.success(t('storeAdded'), {
				position: 'bottom-right',
			});
		} catch (error) {
			toast.error(t('errorAddingStore'), {
				position: 'bottom-right',
			});
		}
	};

	const formatTime = (time) => {
		const hours = Math.floor(time / 100);
		const minutes = time % 100;
		const formattedHours = hours.toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');

		return `${formattedHours}:${formattedMinutes}`;
	};

	const handleDelete = async (storeId) => {
		try {
			await api.delete(`/stores/${storeId}`);
			setStores((prev) => prev.filter((store) => store.id !== storeId));
			toast.success(t('storeDeleted'), {
				position: 'bottom-right',
			});
		} catch (error) {
			toast.error(t('errorDeletingStore'), {
				position: 'bottom-right',
			});
		}
	};

	const handleDeleteWithConfirm = (storeId, storeName) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<ModalContainer>
						<p>
							{t('areYouSureDelete')}{' '}
							<span style={{ fontWeight: 'bold' }}>{storeName}</span>{' '}
							{t('fromList')}?
						</p>
						<div>
							<ConfirmButton
								onClick={() => {
									handleDelete(storeId);
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

	return (
		<>
			<AdminNavBar />
			<TableAndFormContainer>
				<AddStoreForm>
					<Input
						type='text'
						placeholder={t('enterStoreName')}
						value={newStore}
						onChange={(e) => setNewStore(e.target.value)}
					/>
					<Input
						type='text'
						placeholder={t('enterStoreAdress')}
						value={newStoreAdress}
						onChange={(e) => setNewStoreAdress(e.target.value)}
					/>
					<TimeInput
						type='time'
						placeholder={t('selectOpeningTime')}
						value={newOpeningTime}
						onChange={(e) => setNewOpeningTime(e.target.value)}
						title={t('openingTime')}
					/>
					<AddButton onClick={handleAddStore}>{t('addStore')}</AddButton>
				</AddStoreForm>
				<Table>
					<thead>
						<tr>
							<TH></TH>
							<TH>{t('storesList')}</TH>
							<TH>{t('storesAddress')}</TH>
							<TH>{t('openingTime')}</TH>
							<TH>{t('deleteStore')}</TH>
						</tr>
					</thead>
					<tbody>
						{stores.map((store, index) => (
							<tr key={store.id}>
								<TD>{index + 1}</TD>
								<TD>{store.name}</TD>
								<TD>{store.address}</TD>
								<TD>{formatTime(store.opening_time)}</TD>
								<DeleteTD>
									<DeleteContainer>
										<div>
											{`${t('delete')} `}
											<strong>{store.name}</strong>
											{` ${t('fromList')}`}
										</div>

										<DeleteButton
											onClick={() =>
												handleDeleteWithConfirm(store.id, store.name)
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

const AddStoreForm = styled.div`
	width: 100%;
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
	width: 18rem;
	background-color: #e7e7e7;
`;

const TimeInput = styled.input`
	width: 5rem;
	padding: 0.8458rem;
	margin: 0.5rem 0;
	font-size: 0.8rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 18rem;
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
	white-space: nowrap;

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
