// TIPO DE DADO = ARRAY DE USER
// ADAPTER

// USER
// email e senha
// chave primaria - dado que não pode se repetir? Email

import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../..';
import { User } from '../../types/User';

const usersAdapter = createEntityAdapter<User>({
	selectId: (estado) => estado.email,
});

export const { selectAll: buscarUsuarios } = usersAdapter.getSelectors(
	(global: RootState) => global.users,
);

// GET USUARIOS
export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
	// TRATAMENTO DE ERROS
	try {
		// tenta executar todos os comandos daqui de dentro do try
		// tentar requisitar a API
		// se não der certo, vai cair no catch
		// UTILIZAR UM CLIENT HTTP
		const response = await axios.get('http://localhost:8080/usuarios');
		console.log(response);

		return response.data;
	} catch (erro: any) {
		console.log(erro);
		return erro.response.data;
	}
});

// POST USUARIOS
// detalhe - um asyncthunk só recebe um parametro do componente
export const createUser = createAsyncThunk(
	'users/createUser',
	async (novoUsuario: User) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/usuarios/cadastro',
				novoUsuario,
			);

			return response.data;
		} catch (erro: any) {
			console.log(erro);
			return erro.response.data;
		}
	},
);

/*

{
    ids: [],
    entities: {
        
    }
}

*/

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState({
		loading: false,
		mensagem: '',
	}),
	reducers: {
		adicionarUsuario: usersAdapter.addOne,
	},
	extraReducers: (builder) => {
		// GERENCIAMENTO DOS STATUS DE GETALLUSERS
		builder.addCase(getAllUsers.pending, (state) => {
			state.loading = true;
			state.mensagem = 'Tá carregando, segura aí!';
		});
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.mensagem = action.payload.mensagem;
			usersAdapter.setAll(state, action.payload.dados);
		});
		builder.addCase(getAllUsers.rejected, (state) => {
			state.loading = false;
			state.mensagem = 'Deu ruim na requisição!';
		});

		// GERENCIAMENTO DOS STATUS DE CADASTRO DE USUARIO - POST
		builder.addCase(createUser.pending, (state) => {
			state.loading = true;
			state.mensagem = 'Tá carregando, segura aí!';
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.loading = true;
			state.mensagem = 'Tá carregando, segura aí!';

			if (action.payload.dados) {
				usersAdapter.addOne(state, action.payload.dados);
			}

			state.mensagem = action.payload.mensagem;
		});
		builder.addCase(createUser.rejected, (state) => {
			state.loading = false;
			state.mensagem = 'Deu ruim na requisição!';
		});
	},
});

// separar actions do reducer
export const { adicionarUsuario } = usersSlice.actions;

export default usersSlice.reducer;

// TODA REQUISIÇÃO FETCH === PROMISE
// sincrono => executa as inscrições dadas de cima pra baixo da esquerda para direita
// assincrono => demora a ficar pronta a resposta

// PROMISE
// pendente => pending - foi disparada a solicitação e ainda não possui retorno
// concluida => fulfilled - passou pelo status pendente e já possui um retorno (Sucesso ou Falha)
// rejeitada => rejected - erro do dev / requisição montada/estruturada de forma errada

// then catch

// async await
