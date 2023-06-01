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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProps {
	id?: string;
	email: string;
	password: string;
}

import Loading from '../../../../shared-components/Loading';
import { SnackBarComp } from '../../../../shared-components/SnackBar';
import { useAppDispatch } from '../../../../store/hooks';
import {
	hideLoading,
	showLoading,
} from '../../../../store/modules/Loading/loadingSlice';
import { loginUser } from '../../../../store/modules/Users/usersSlice';
import { emailRegex } from '../../../../utils/validators/regexData';
import { IsValidCredentials } from '../../types/IsValidCredentials';
import ModalSignupUser from '../ModalSignUpUser';

export const FormLogin = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState('');
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [emailIsValid, setEmailIsValid] = useState<IsValidCredentials>({
		helperText: '',
		isValid: false,
	});

	// useAppSelector - buscar uma determinada propriedade/estado Global

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (email.length && !emailRegex.test(email)) {
			setEmailIsValid({
				helperText: 'Email inválido',
				isValid: false,
			});
			return;
		}

		setEmailIsValid({
			helperText: 'Utilize seu e-mail para realizar o login.',
			isValid: true,
		});
	}, [email]);

	useEffect(() => {
		if (
			localStorage.getItem('userLogged') ||
			sessionStorage.getItem('userLogged')
		) {
			navigate('/home');
		}
	}, [navigate]);

	const loggedUser = (
		event: React.SyntheticEvent<Element, Event>,
		checked: boolean,
	) => {
		setIsLogged(checked);
	};

	// função que controla a abertura do Modal - dispara ao clique do link de cadastrar conta
	const handleClickOpen = () => {
		setIsOpen(true);
	};

	const verifyUserExists = () => {
		dispatch(showLoading());
		dispatch(loginUser({ email, password, isLogged }));
		setTimeout(() => {
			dispatch(hideLoading());
			navigate('/home');
		}, 3000);
	};

	return (
		<>
			<Box
				component={'form'}
				sx={{ maxWidth: '80%' }}
				onSubmit={(event) => {
					event.preventDefault();
					verifyUserExists();
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="E-mail"
							helperText={emailIsValid.helperText}
							fullWidth
							error={!emailIsValid.isValid}
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
			</Box>

			<ModalSignupUser aberto={isOpen} mudarAberto={setIsOpen} />
			<Loading />
			<SnackBarComp />
		</>
	);
};
