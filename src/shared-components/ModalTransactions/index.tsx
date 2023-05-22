/* eslint-disable no-case-declarations */
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
import { useState } from 'react';
import { v4 as gerarId } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideModal } from '../../store/modules/ModalTransaction';
import { createTransaction } from '../../store/modules/Transactions/transactionsSlice';
import TransactionsModel from '../../store/types/Transactions';

interface ModalTransactionsProps {
	transactionSelected?: TransactionsModel;
}

export const ModalTransaction: React.FC<ModalTransactionsProps> = ({
	transactionSelected,
}) => {
	const [valor, setValor] = useState('');
	const [desc, setDesc] = useState('');
	const [data, setData] = useState('');
	const [tipo, setTipo] = useState('income');

	const select = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();

	const handleConfirm = () => {
		switch (select.context) {
			case 'create':
				const newTransaction: TransactionsModel = {
					id: gerarId(),
					value: Number(valor),
					createdAt: data,
					description: desc,
					type: tipo as 'income' | 'outcome',
					createdBy: (sessionStorage.getItem('userLogged') ??
						localStorage.getItem('userLogged')) as string,
				};

				dispatch(createTransaction(newTransaction));
				clearInputs();
				dispatch(hideModal());
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

	const clearInputs = () => {
		setValor('');
		setDesc('');
		setData('');
		setTipo('income');
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
								value={valor}
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											R$
										</InputAdornment>
									),
								}}
								fullWidth
								onChange={(e) => setValor(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Descrição"
								value={desc}
								type="text"
								fullWidth
								onChange={(e) => setDesc(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								InputLabelProps={{
									shrink: true,
								}}
								label="Data"
								value={data}
								type="date"
								fullWidth
								onChange={(e) => setData(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
								value={tipo}
								onChange={(e) =>
									setTipo(
										(e.target as HTMLInputElement).value,
									)
								}
							>
								<FormControlLabel
									value="income"
									control={<Radio />}
									label="Entrada"
								/>
								<FormControlLabel
									value="outcome"
									control={<Radio />}
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
