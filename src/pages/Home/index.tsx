import { Box } from '@mui/material';

import MyAppBar from '../../shared-components/AppBar';
import { Section } from '../../shared-components/Section';

const Home = () => {
	return (
		<>
			<MyAppBar context="home" />
			<Box
				component={'main'}
				sx={{
					width: { xs: '100%', sm: '80%' },
					marginY: 3,
					marginX: 'auto',
				}}
			>
				<Section context="home" />
			</Box>
		</>
	);
};

export default Home;
