import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button } from '@material-ui/core';

interface HomePageProps {
	username: string;
}

const HomePage: React.FC<HomePageProps> = ({ username }) => {
	const navigate = useNavigate();
	const onLogout = () => {
		navigate('/login');
	};

	return (
		<Container>
			<Card style={{ marginTop: 50 }}>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						Hello, {username}!
					</Typography>
					<Typography paragraph>You have successfully logged in to the program. This is the main page.</Typography>
					<Button variant="contained" color="primary" onClick={onLogout}>
						Log out
					</Button>
				</CardContent>
			</Card>
		</Container>
	);
};

export default HomePage;
