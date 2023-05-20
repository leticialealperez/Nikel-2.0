import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	Grid,
	InputAdornment,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideModal } from '../../store/modules/ModalTransaction';
import TransactionsModel from '../../store/types/Transactions';

interface ModalTransactionsProps {
	transactionSelected?: TransactionsModel;
}

export const ModalTransaction: React.FC<ModalTransactionsProps> = ({
	transactionSelected,
}) => {
	const select = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const handleConfirm = () => {
		switch (select.context) {
			case 'create':
				// dispatch(createTransaction({}));
				console.log('criar');
				break;
			case 'update':
				// dispatch(updateTransaction({}));
				console.log('atualizar');
				break;
			case 'delete':
				// dispatch(deleteTransaction({}));
				console.log('deletar');
				break;
			default:
		}
	};

	return (
		<Dialog
			open={select.open}
			onClose={() => dispatch(hideModal())}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{select.context === 'create' && 'Criar Transação'}
				{select.context === 'update' && 'Editar Transação'}
				{select.context === 'delete' && 'Deletar Transação'}
			</DialogTitle>
			<DialogContent>
				{select.context !== 'delete' && (
					<Grid container spacing={3} marginTop={1}>
						<Grid item xs={12}>
							<TextField
								label="Valor"
								value={transactionSelected?.value}
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											R$
										</InputAdornment>
									),
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Descrição"
								value={transactionSelected?.description}
								type="text"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								InputLabelProps={{
									shrink: true,
								}}
								label="Data"
								value={transactionSelected?.createdAt}
								type="date"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
							>
								<FormControlLabel
									value="income"
									control={<Radio />}
									checked={
										transactionSelected?.type === 'income'
									}
									label="Entrada"
								/>
								<FormControlLabel
									value="outcome"
									control={<Radio />}
									checked={
										transactionSelected?.type === 'outcome'
									}
									label="Saída"
								/>
							</RadioGroup>
						</Grid>
					</Grid>
				)}

				{select.context === 'delete' && (
					<DialogContentText id="alert-dialog-description">
						Tem certeza que deseja remover a transação, essa ação é
						irreversível
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={() => dispatch(hideModal())}
				>
					Cancelar
				</Button>
				<Button variant="contained" onClick={handleConfirm} autoFocus>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
};
