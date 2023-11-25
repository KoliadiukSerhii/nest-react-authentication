import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Grid } from '@material-ui/core';
import { registration } from '../api/userAPI';

interface RegistrationFormProps {
	setUser: (user: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ setUser }) => {
	const [formData, setFormData] = useState({
		name: '',
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const user = await registration(formData.name, formData.email, formData.password);
			setUser(user);
			navigate('/home');
		} catch (error) {
			console.error('login failed', error);
		}
	};

	const onSwitchToLogin = () => {
		navigate('/login');
	};

	return (
		<Container>
			<Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth />
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" color="primary">
								Sign up
							</Button>
						</Grid>
					</Grid>
					<Grid container justify="flex-end">
						<Button color="primary" onClick={onSwitchToLogin}>
							Log in
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default RegistrationForm;
