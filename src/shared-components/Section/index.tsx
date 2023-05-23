import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaidIcon from '@mui/icons-material/Paid';
import { Box, Grid } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { useAppSelector } from '../../store/hooks';
import { listAllTransactions } from '../../store/modules/Transactions/transactionsSlice';
import { SectionText } from '../SectionText';

interface SectionProps {
	context: 'home' | 'transactions';
}

export const Section: React.FC<SectionProps> = ({ context }) => {
	const [userLogged, setUserLogged] = useState(
		(sessionStorage.getItem('userLogged') ??
			localStorage.getItem('userLogged')) as string,
	);
	const select = useAppSelector(listAllTransactions);

	const total = useMemo(() => {
		return select.reduce((prev, curr) => {
			if (curr.createdBy === userLogged) {
				if (curr.type === 'income') {
					return prev + curr.value;
				} else {
					return prev - curr.value;
				}
			}
			return prev;
		}, 0);
	}, [select, userLogged]);

	return (
		<Grid container>
			<Grid
				item
				xs={6}
				display={'flex'}
				justifyContent={'flex-start'}
				alignItems={'center'}
			>
				{context === 'home' && (
					<SectionText
						text={`R$ ${total.toFixed(2)}`}
						icon={<LocalAtmIcon color="primary" fontSize="large" />}
					/>
				)}
				{context === 'transactions' && (
					<SectionText
						text="Lançamentos"
						icon={<PaidIcon color="primary" fontSize="large" />}
					/>
				)}
			</Grid>
			<Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
				<Box
					component={'img'}
					src="/public/assets/images/coins-small.png"
				></Box>
			</Grid>
		</Grid>
	);
};
