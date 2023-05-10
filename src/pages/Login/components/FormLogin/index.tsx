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

export const FormLogin = () => {
	return (
		<Box component={'form'} sx={{ maxWidth: '80%' }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="E-mail"
						helperText="Utilize seu e-mail para realizar o login."
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField label="Senha" fullWidth />
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox />}
						label="Permanecer logado?"
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
					<Typography variant={'caption'} sx={{ fontSize: '14px' }}>
						Ainda não tem conta?{' '}
						<Link sx={{ textDecoration: 'none' }}>Criar uma!</Link>
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};
