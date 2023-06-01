import { ArrowCircleDown, ArrowCircleUp } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	getTransaction,
	listAllTransactions,
} from '../../store/modules/Transactions/transactionsSlice';
import ItemTransaction from '../ItemTransaction';

interface ColumnTransactionProps {
	type: 'income' | 'outcome';
}

const ColumnTransaction: React.FC<ColumnTransactionProps> = ({ type }) => {
	const dispatch = useAppDispatch();
	const listaDeTransacoes = useAppSelector(listAllTransactions);

	const [userLogged, setUserLogged] = useState(
		(sessionStorage.getItem('userLogged') ??
			localStorage.getItem('userLogged')) as string,
	);

	useEffect(() => {
		dispatch(getTransaction(JSON.parse(userLogged)));
	}, []);

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
				.filter(
					(transaction) =>
						transaction.createdBy === JSON.parse(userLogged) &&
						transaction.type === type,
				)
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
