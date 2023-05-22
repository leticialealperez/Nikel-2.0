import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showModal } from '../../store/modules/ModalTransaction';
import TransactionsModel from '../../store/types/Transactions';
import { ModalTransaction } from '../ModalTransactions';

interface ItemTransactionProps {
	transaction: TransactionsModel;
}

const ItemTransaction: React.FC<ItemTransactionProps> = ({ transaction }) => {
	const modal = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();

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
							onClick={() => dispatch(showModal('delete'))}
						>
							<Delete />
						</IconButton>
						<IconButton
							color="success"
							aria-label="edit"
							onClick={() => dispatch(showModal('update'))}
						>
							<Edit />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
			{modal.context !== 'create' && (
				<ModalTransaction transactionSelected={transaction} />
			)}
		</>
	);
};

export default ItemTransaction;
