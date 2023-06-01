import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../..';
import TransactionsModel from '../../types/Transactions';
import { showNotification } from '../Notification/notificationSlice';

const transactionsAdapter = createEntityAdapter<TransactionsModel>({
	selectId: (state) => state.id,
});

export const createTransaction = createAsyncThunk(
	'transactions/createTransaction',
	async (transaction: Omit<TransactionsModel, 'id'>, { dispatch }) => {
		const { createdBy, description, type, value, createdAt } = transaction;
		console.log(createdBy);
		try {
			const response = await axios.post(
				`http://localhost:8080/usuarios/${createdBy}/transacoes/criar`,
				{
					description,
					type,
					value,
					createdAt,
				},
			);

			dispatch(
				showNotification({
					message: response.data.mensagem,
					success: true,
				}),
			);

			return response.data; // {  mensagem: "", dados: { ...novaTransação } }
		} catch (error: any) {
			dispatch(
				showNotification({
					message: error.response.data.mensagem,
					success: true,
				}),
			);
			return error.response.data; // {  mensagem: "" }
		}
	},
);

export const getTransaction = createAsyncThunk(
	'transactions/listTransaction',
	async (email: string) => {
		try {
			const response = await axios.get(
				`http://localhost:8080/usuarios/${email}/transacoes/listar`,
			);
			return response.data;
		} catch (error: any) {
			return error.response.data;
		}
	},
);

interface DeleteType {
	email: string;
	idTransaction: string;
}

export const deleteTransaction = createAsyncThunk(
	'transactions/deleteTransaction',
	async (deleteParam: DeleteType, { dispatch }) => {
		try {
			const response = await axios.delete(
				`http://localhost:8080/usuarios/${deleteParam.email}/transacoes/deletar/${deleteParam.idTransaction}`,
			);

			dispatch(
				showNotification({
					message: response.data.mensagem,
					success: true,
				}),
			);
			return response.data;
		} catch (error: any) {
			dispatch(
				showNotification({
					message: error.response.data.mensagem,
					success: false,
				}),
			);
			return error.response.data;
		}
	},
);

const transactionsSlice = createSlice({
	initialState: transactionsAdapter.getInitialState({
		loading: false,
		mensagem: '',
	}),
	name: 'transactions',
	reducers: {
		updateTransaction: transactionsAdapter.updateOne,
	},
	extraReducers: (builder) => {
		builder.addCase(createTransaction.pending, (state, action) => {
			state.loading = true;
			state.mensagem = 'Tá carregando, segura aí!';
		});
		builder.addCase(createTransaction.fulfilled, (state, action) => {
			// OU A API RETORNOU 400...500 - DEU ERRO NO CADASTRO NA API

			// OU API RETORNOU 200...299 - DEU CERTO O CADASTRO NA API
			state.loading = false;

			if (action.payload.dados) {
				transactionsAdapter.addOne(state, action.payload.dados);
			}

			state.mensagem = action.payload.mensagem; // 'Transação cadastrada com sucesso!'
		});
		builder.addCase(createTransaction.rejected, (state, action) => {
			// Erro no servidor
			state.loading = false;
			state.mensagem = 'Deu ruim na requisição';
		});

		builder.addCase(getTransaction.fulfilled, (state, action) => {
			(state.loading = false),
				(state.mensagem = action.payload.mensagem),
				transactionsAdapter.setAll(state, action.payload.dados);
		});
		builder.addCase(getTransaction.pending, (state) => {
			state.loading = true;
			state.mensagem = 'Tá carregando, segura aí!';
		});
		builder.addCase(getTransaction.rejected, (state) => {
			// Erro no servidor
			state.loading = false;
			state.mensagem = 'Deu ruim na requisição';
		});

		builder.addCase(deleteTransaction.pending, (state) => {
			state.loading = true;
			state.mensagem = 'Tá carregando, segura aí!';
		});
		builder.addCase(deleteTransaction.fulfilled, (state, action) => {
			state.loading = false;
			state.mensagem = action.payload.mensagem;

			// não consegui passar - travamos no removeOne! :)
			// transactionsAdapter.removeOne(state, )

			if (action.payload.itemRemovido) {
				transactionsAdapter.removeOne(
					state,
					action.payload.itemRemovido.id,
				);
			}
		});
		builder.addCase(deleteTransaction.rejected, (state) => {
			// Erro no servidor
			state.loading = false;
			state.mensagem = 'Deu ruim na requisição';
		});
	},
});

export const { selectAll: listAllTransactions } =
	transactionsAdapter.getSelectors((state: RootState) => state.transactions);

export const { updateTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
