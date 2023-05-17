import { AccountCircle, Home, MonetizationOn } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import NikelSmall from '/assets/images/nikel-small-logo.png';

interface MyAppBarProps {
	context: 'home' | 'transactions';
}

const MyAppBar: React.FC<MyAppBarProps> = ({ context }) => {
	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: '#fff',
					height: '15vh',
					justifyContent: 'center',
				}}
			>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<IconButton>
						<Box component={'img'} src={NikelSmall}></Box>
					</IconButton>
					<Box component="nav">
						<IconButton>
							<Home
								color={
									context == 'home' ? 'primary' : 'secondary'
								}
								onClick={() => navigate('/home')}
								fontSize="large"
							/>
						</IconButton>
						<IconButton>
							<MonetizationOn
								color={
									context == 'transactions'
										? 'primary'
										: 'secondary'
								}
								onClick={() => navigate('/transactions')}
								fontSize="large"
							/>
						</IconButton>
						<IconButton>
							<AccountCircle color="secondary" fontSize="large" />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default MyAppBar;
