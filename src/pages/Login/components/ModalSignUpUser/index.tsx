import { Close } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import { adicionarUsuario } from '../../../../store/modules/Users/usersSlice';

interface AlertDialogProps {
	aberto: boolean;
	mudarAberto: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ aberto, mudarAberto }) => {
	const [emailCadastro, setEmailCadastro] = useState<string>('');
	const [senhaCadastro, setSenhaCadastro] = useState<string>('');

	const dispatch = useAppDispatch();

	const handleClose = () => {
		mudarAberto(false);
	};

	const aviso = () => {
		alert('Executou!');
	};

	return (
		<Dialog
			open={aberto}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{'Crie sua conta!'}

				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<Close />
				</IconButton>
			</DialogTitle>

			<Divider />
			<Box
				component="form"
				marginTop={3}
				onSubmit={(ev) => {
					ev.preventDefault();
					// cadastrar um usuario - ESTADO GLOBAL
					dispatch(
						adicionarUsuario({
							email: emailCadastro,
							senha: senhaCadastro,
						}),
					);
					// limpar os campos de input
					setEmailCadastro('');
					setSenhaCadastro('');

					// fechar o modal
					handleClose();
				}}
			>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="E-mail"
								helperText="Utilize seu e-mail para criar uma conta."
								fullWidth
								onChange={(event) => {
									setEmailCadastro(event.currentTarget.value);
								}}
								value={emailCadastro}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Senha"
								fullWidth
								helperText="Utilize uma senha fácil de lembrar e anote para não esquecer."
								type="password"
								onChange={(event) => {
									setSenhaCadastro(event.currentTarget.value);
								}}
								value={senhaCadastro}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />

				<DialogActions sx={{ paddingY: 2 }}>
					<Button
						type="button"
						onClick={handleClose}
						variant="outlined"
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						onClick={handleClose}
						autoFocus
						variant="contained"
					>
						Cadastrar
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default AlertDialog;
