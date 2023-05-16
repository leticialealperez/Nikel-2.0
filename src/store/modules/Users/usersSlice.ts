// TIPO DE DADO = ARRAY DE USER
// ADAPTER

// USER
// email e senha
// chave primaria - dado que não pode se repetir? Email

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';

interface User {
	email: string;
	senha: string;
}

const usersAdapter = createEntityAdapter<User>({
	selectId: (estado) => estado.email,
});

export const { selectAll } = usersAdapter.getSelectors(
	(global: RootState) => global.users,
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
	initialState: usersAdapter.getInitialState(),
	reducers: {
		adicionarUsuario: usersAdapter.addOne,
	},
});

// separar actions do reducer
export const { adicionarUsuario } = usersSlice.actions;

export default usersSlice.reducer;