import { Add } from '@mui/icons-material';
import { Fab, Grid, Paper } from '@mui/material';

import { useAppDispatch } from '../../store/hooks';
import { showModal } from '../../store/modules/ModalTransaction';
import ColumnTransaction from '../ColumnTransaction';
import { ModalTransaction } from '../ModalTransactions';

const Card = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Paper
						sx={{
							height: 'min-content',
							paddingY: 3,
							marginBottom: 5,
						}}
					>
						<Grid container>
							<ColumnTransaction type="income" />
							<ColumnTransaction type="outcome" />
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
				onClick={() => dispatch(showModal('create'))}
			>
				<Add />
			</Fab>
			<ModalTransaction />
		</>
	);
};

export default Card;
