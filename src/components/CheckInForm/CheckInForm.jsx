import { NavBar } from './NavBar';
import { SelectStoreAndName } from './Select';
import { CheckInButton } from './CheckInButton';

export const CheckInForm = ({
	storeValue,
	setStoreValue,
	nameValue,
	setNameValue,
	reasonValue,
	setReasonValue,
}) => {
	return (
		<div>
			<NavBar />
			<SelectStoreAndName
				storeValue={storeValue}
				setStoreValue={setStoreValue}
				nameValue={nameValue}
				setNameValue={setNameValue}
				reasonValue={reasonValue}
				setReasonValue={setReasonValue}
				minDate={new Date(2000, 0, 1)}
			/>
			<CheckInButton
				storeValue={storeValue}
				nameValue={nameValue}
				setNameValue={setNameValue}
				setStoreValue={setStoreValue}
				reasonValue={reasonValue}
				setReasonValue={setReasonValue}
			/>
		</div>
	);
};
