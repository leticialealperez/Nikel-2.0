import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import { v4 as generateId } from 'uuid';

import TransactionsModel from '../../store/types/Transactions';

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
];

const Card = () => {
	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Paper
						sx={{
							height: '500px',
						}}
					>
						<Grid container>
							<Grid item xs={6} padding={2}>
								<Typography variant="h3">
									<ArrowCircleDownIcon /> Entradas
								</Typography>
								<Divider />
								{listaDeTransacoes
									.filter(
										(transaction) =>
											transaction.type === 'income',
									)
									.map((transaction) => {
										return (
											<>
												<Grid container>
													<Grid item xs={12}>
														{transaction.value}
													</Grid>
													<Grid item xs={6}>
														{
															transaction.description
														}
													</Grid>
													<Grid
														item
														xs={6}
														textAlign="end"
													>
														{transaction.createdAt}
													</Grid>
												</Grid>
											</>
										);
									})}
							</Grid>
							<Grid item xs={6} padding={2}>
								<Typography variant="h3">
									<ArrowCircleUpIcon /> Saidas
								</Typography>
								<Divider />
								{listaDeTransacoes
									.filter(
										(transaction) =>
											transaction.type === 'outcome',
									)
									.map((transaction) => {
										return (
											<>
												<Grid container>
													<Grid item xs={12}>
														{transaction.value}
													</Grid>
													<Grid item xs={6}>
														{
															transaction.description
														}
													</Grid>
													<Grid
														item
														xs={6}
														textAlign="end"
													>
														{transaction.createdAt}
													</Grid>
												</Grid>
											</>
										);
									})}
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Card;
