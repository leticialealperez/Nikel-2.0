import { combineReducers } from '@reduxjs/toolkit';

import usersSlice from './Users/usersSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	users: usersSlice,
});

export default rootReducer;
