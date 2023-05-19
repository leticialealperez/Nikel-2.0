import { Grid, Typography } from '@mui/material';
import React from 'react';

import TransactionsModel from '../../store/types/Transactions';

interface ItemTransactionProps {
	transaction: TransactionsModel;
}

const ItemTransaction: React.FC<ItemTransactionProps> = ({ transaction }) => {
	return (
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
		</Grid>
	);
};

export default ItemTransaction;
