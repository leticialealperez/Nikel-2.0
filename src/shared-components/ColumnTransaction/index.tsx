import { ArrowCircleDown, ArrowCircleUp } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../../store/hooks';
import { listAllTransactions } from '../../store/modules/Transactions/transactionsSlice';
import ItemTransaction from '../ItemTransaction';

interface ColumnTransactionProps {
	type: 'income' | 'outcome';
}

const ColumnTransaction: React.FC<ColumnTransactionProps> = ({ type }) => {
	const listaDeTransacoes = useAppSelector(listAllTransactions);

	return (
		<Grid item xs={6} padding={2}>
			<Typography variant="h3">
				{type === 'income' && (
					<>
						<ArrowCircleDown /> {'Entradas'}
					</>
				)}
				{type === 'outcome' && (
					<>
						<ArrowCircleUp /> {'Saídas'}
					</>
				)}
			</Typography>
			<Divider />
			{listaDeTransacoes
				.filter((transaction) => transaction.type === type)
				.map((transaction, index) =>
					index < 5 ? (
						<ItemTransaction
							key={transaction.id}
							transaction={transaction}
						/>
					) : null,
				)}
		</Grid>
	);
};

export default ColumnTransaction;
