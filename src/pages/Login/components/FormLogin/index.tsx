import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProps {
	id?: string;
	email: string;
	password: string;
}

import { SnackBarComp } from '../../../../shared-components/SnackBar';
import ModalSignupUser from '../ModalSignUpUser';

export const FormLogin = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState('');
	const [isLogged, setIsLogged] = useState<boolean>(false);

	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const [users, setUsers] = useState<any>([]);
	const navigate = useNavigate();

	const loggedUser = (
		event: React.SyntheticEvent<Element, Event>,
		checked: boolean,
	) => {
		if (checked) {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	};

	const verifySnack = (emailIsValid: boolean, passwordIsValid: boolean) => {
		if (emailIsValid === false) {
			setMessage('Erro ao tentar logar.');
			setIsError(!emailIsValid);
			return;
		}

		if (passwordIsValid === false) {
			setMessage('Erro ao tentar logar.');
			setIsError(!passwordIsValid);
			return;
		}
	};

	// função que controla o fechamento do snackbar
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsError(false);
	};

	// função que controla a abertura do Modal - dispara ao clique do link de cadastrar conta
	const handleClickOpen = () => {
		setIsOpen(true);
	};

	return (
		<>
			<Box
				component={'form'}
				sx={{ maxWidth: '80%' }}
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="E-mail"
							helperText="Utilize seu e-mail para realizar o login."
							fullWidth
							onChange={(event) => {
								setEmail(event.currentTarget.value);
							}}
							value={email}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Senha"
							fullWidth
							onChange={(event) => {
								setPassword(event.currentTarget.value);
							}}
							type="password"
							value={password}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox />}
							label="Permanecer logado?"
							onChange={loggedUser}
							value={isLogged}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							variant="contained"
							sx={{
								display: 'block',
								margin: '0 auto',
								width: '130px',
								'&:hover': {
									backgroundColor: '#4c79c3',
								},
							}}
							size="large"
						>
							Entrar
						</Button>
					</Grid>
					<Grid item xs={12} textAlign={'center'}>
						<Typography
							variant={'caption'}
							sx={{ fontSize: '14px' }}
						>
							Ainda não tem conta?{' '}
							<Link
								component={'button'}
								type="button"
								sx={{ textDecoration: 'none' }}
								onClick={handleClickOpen}
							>
								Criar uma!
							</Link>
						</Typography>
					</Grid>
				</Grid>
				<SnackBarComp
					handleClose={handleClose}
					message={message}
					isError={isError}
				/>
			</Box>
			<ModalSignupUser aberto={isOpen} mudarAberto={setIsOpen} />
		</>
	);
};
