import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CheckInForm } from './components/CheckInForm/CheckInForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Result } from './components/Result/Result';

function App() {
  const [storeValue, setStoreValue] = useState(null);
  const [nameValue, setNameValue] = useState('');
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
    </Routes>
  );
}

export default App;
