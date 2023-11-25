import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const registration = async (name: string, email: string, password: string) => {
	const { data } = await axios.post(`${process.env.REACT_APP_API_URL}auth/register`, {
		name: name,
		email: email,
		password: password,
	});
	localStorage.setItem('token', data);

	return jwtDecode(data);
};

export const login = async (email: string, password: string) => {
	const { data } = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, {
		email: email,
		password: password,
	});
	localStorage.setItem('token', data);
	return jwtDecode(data);
};

export const logout = async () => {
	const response = await axios.get(`${process.env.REACT_APP_API_URL}auth/logout`);

	return response;
};
