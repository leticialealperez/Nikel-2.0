import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout'

import Welcome from '../../pages/Welcome';
import { Login } from '../../pages/Login';

const AppRoutes: React.FC = () => {
	return (
		<Layout>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Layout>
	);
};

export default AppRoutes;
