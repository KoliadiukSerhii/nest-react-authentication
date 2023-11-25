import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Grid } from '@material-ui/core';
import { login } from '../api/userAPI';

interface LoginFormProps {
	setUser: (user: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const onSwitchToRegistration = () => {
		navigate('/registration');
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const user = await login(formData.email, formData.password);

			setUser(user);
			navigate('/home');
		} catch (error) {
			console.error('login failed', error);
		}
	};

	return (
		<Container>
			<Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth />
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" color="primary">
								Log in
							</Button>
						</Grid>
					</Grid>
					<Grid container justify="flex-end">
						<Button color="primary" onClick={onSwitchToRegistration}>
							Registration
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default LoginForm;
