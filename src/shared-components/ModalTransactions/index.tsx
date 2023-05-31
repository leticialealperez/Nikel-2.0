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
import { SetStateAction, useEffect, useState } from 'react';
import { v4 as gerarId } from 'uuid';

import { useAppDispatch } from '../../store/hooks';
import {
	createTransaction,
	deleteTransaction,
	updateTransaction,
} from '../../store/modules/Transactions/transactionsSlice';
import TransactionsModel from '../../store/types/Transactions';

interface ModalTransactionsProps {
	transactionSelected?: TransactionsModel;
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalTransaction: React.FC<ModalTransactionsProps> = ({
	transactionSelected,
	context,
	open,
	setOpen,
}) => {
	const [valor, setValor] = useState(transactionSelected?.value ?? '');
	const [desc, setDesc] = useState(transactionSelected?.description ?? '');
	const [data, setData] = useState(transactionSelected?.createdAt ?? '');
	const [tipo, setTipo] = useState(transactionSelected?.type ?? 'income');

	useEffect(() => {
		console.log(transactionSelected);
	}, [transactionSelected]);

	const dispatch = useAppDispatch();

	const handleConfirm = () => {
		switch (context) {
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
				
				clearInputs();
				setOpen(false);
				console.log('criar');
				break;

			case 'update':
				if (transactionSelected) {
					dispatch(
						updateTransaction({
							id: transactionSelected.id,
							changes: {
								value: +valor, //mágica === Number(x)
								description: desc,
								createdAt: data,
								type: tipo,
							},
						}),
					);
				}

				break;
			case 'delete':
				if (transactionSelected) {
					
				}
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
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{context === 'create' && 'Criar Transação'}
				{context === 'update' && 'Editar Transação'}
				{context === 'delete' && 'Deletar Transação'}
			</DialogTitle>
			<DialogContent>
				{context !== 'delete' && (
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
										(e.target as HTMLInputElement).value as
											| 'income'
											| 'outcome',
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

				{context === 'delete' && (
					<DialogContentText id="alert-dialog-description">
						Tem certeza que deseja remover a transação, essa ação é
						irreversível
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
				<Button variant="contained" onClick={()=> {
					const newTransaction: TransactionsModel = {
						id: gerarId(),
						value: Number(valor),
						createdAt: data,
						description: desc,
						type: tipo as 'income' | 'outcome',
						createdBy: (sessionStorage.getItem('userLogged') ??
							localStorage.getItem('userLogged')) as string,
					};
					
					dispatch(createTransaction(newTransaction))}
					} autoFocus>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
};
