import { Add } from '@mui/icons-material';
import { Fab, Grid, Paper } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import ColumnTransaction from '../ColumnTransaction';
import { ModalTransaction } from '../ModalTransactions';

const Card = () => {
	const [open, setOpen] = useState(false);
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
				onClick={() => setOpen(true)}
			>
				<Add />
			</Fab>
			<ModalTransaction context="create" open={open} setOpen={setOpen} />
		</>
	);
};

export default Card;
