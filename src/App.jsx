import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CheckInForm } from './components/CheckInForm/CheckInForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Result } from './components/Result/Result';
import { Employees } from './components/Employees/Employees';
import { Stores } from './components/Stores/Stores';

function App() {
	const [storeValue, setStoreValue] = useState(null);
	const [nameValue, setNameValue] = useState('');
	const [reasonValue, setReasonValue] = useState('');
	return (
		<Routes>
			<Route
				path='/'
				element={
					<CheckInForm
						storeValue={storeValue}
						setStoreValue={setStoreValue}
						nameValue={nameValue}
						setNameValue={setNameValue}
						reasonValue={reasonValue}
						setReasonValue={setReasonValue}
					/>
				}
				index
			/>
			<Route
				path='/login'
				element={<LoginForm />}
			/>
			<Route
				path='/results'
				element={
					<Result
						nameValue={nameValue}
						setNameValue={setNameValue}
					/>
				}
			/>
			<Route
				path='/employees'
				element={<Employees />}
			/>
      <Route 
      path='/stores'
      element={<Stores />}
      />
		</Routes>
	);
}

export default App;
