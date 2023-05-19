import { ArrowCircleDown, ArrowCircleUp } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { v4 as generateId } from 'uuid';

import TransactionsModel from '../../store/types/Transactions';
import ItemTransaction from '../ItemTransaction';

interface ColumnTransactionProps {
	type: 'income' | 'outcome';
}

const listaDeTransacoes: TransactionsModel[] = [
	{
		id: generateId(),
		type: 'income',
		value: 50000,
		description: 'vale',
		createdAt: '17/05/2024',
		createdBy: 'Teste',
	},
	{
		id: generateId(),
		type: 'outcome',
		value: 49500,
		description: 'Boletos growdev',
		createdAt: '18/05/2024',
		createdBy: 'Teste',
	},
	{
		id: generateId(),
		type: 'income',
		value: 50000,
		description: 'vale',
		createdAt: '18/05/2024',
		createdBy: 'Teste',
	},
	{
		id: generateId(),
		type: 'income',
		value: 50000,
		description: 'vale',
		createdAt: '17/05/2024',
		createdBy: 'Teste',
	},
	{
		id: generateId(),
		type: 'income',
		value: 50000,
		description: 'vale',
		createdAt: '17/05/2024',
		createdBy: 'Teste',
	},
	{
		id: generateId(),
		type: 'income',
		value: 50000,
		description: 'vale',
		createdAt: '17/05/2024',
		createdBy: 'Teste',
	},
	{
		id: generateId(),
		type: 'income',
		value: 50000,
		description: 'vale',
		createdAt: '17/05/2024',
		createdBy: 'Teste',
	},
];

const ColumnTransaction: React.FC<ColumnTransactionProps> = ({ type }) => {
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
