import { Grid, Paper } from '@mui/material';

import ColumnTransaction from '../ColumnTransaction';

const Card = () => {
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
		</>
	);
};

export default Card;
