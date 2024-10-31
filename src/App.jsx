import './App.css';
import { Route, Routes } from 'react-router-dom';
import { CheckInForm } from './components/CheckInForm/CheckInForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Result } from './components/Result/Result';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<CheckInForm />}
        index
      />
      <Route
        path='/login'
        element={<LoginForm />}
      />
      <Route
        path='/results'
        element={<Result />}
      />
    </Routes>
  );
}

export default App;
