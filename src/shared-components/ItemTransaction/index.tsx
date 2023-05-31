import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';

import TransactionsModel from '../../store/types/Transactions';
import { ModalTransaction } from '../ModalTransactions';
import { deleteTransaction } from '../../store/modules/Transactions/transactionsSlice';

interface ItemTransactionProps {
	transaction: TransactionsModel;
}

const ItemTransaction: React.FC<ItemTransactionProps> = ({ transaction }) => {
	const [open, setOpen] = useState(false);
	const [deleta, setDeleta] = useState(false);
	const [update, setUpdate] = useState(false);

	const dispatch = useAppDispatch()

	return (
		<>
			<Grid key={transaction.id} container marginY={3}>
				<Grid item xs={12}>
					<Typography variant="h5">
						R${transaction.value.toFixed(2)}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant="caption">
						{transaction.description}
					</Typography>
				</Grid>
				<Grid item xs={6} textAlign="end">
					<Typography variant="caption">
						{transaction.createdAt}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack direction="row" spacing={2}>
						<IconButton
							color="error"
							aria-label="delete"
							onClick={() => {
								// setOpen(true);
								// setUpdate(false);
								// setDeleta(true);
								dispatch(deleteTransaction({email:transaction.createdBy, idTransaction:transaction.id}))
							}}
						>
							<Delete />
						</IconButton>
						<IconButton
							color="success"
							aria-label="edit"
							onClick={() => {
								setOpen(true);
								setUpdate(true);
								setDeleta(false);
							}}
						>
							<Edit />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
			<ModalTransaction
				context={update ? 'update' : 'delete'}
				open={open}
				setOpen={setOpen}
				transactionSelected={transaction}
			/>
		</>
	);
};

export default ItemTransaction;
