import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

const App: React.FC = () => {
	const [user, setUser] = useState({
		id: 0,
		name: '',
		email: '',
	});
	return (
		<Router>
			<Routes>
				<Route path="/registration" element={<RegistrationForm setUser={setUser} />} />
				<Route path="/login" element={<LoginForm setUser={setUser} />} />
				<Route path="/home" element={<HomePage username={user.name} />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</Router>
	);
};

export default App;
