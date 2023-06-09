import { combineReducers } from '@reduxjs/toolkit';

import loadingSlice from './Loading/loadingSlice';
import notificationSlice from './Notification/notificationSlice';
import transactionsSlice from './Transactions/transactionsSlice';
import usersSlice from './Users/usersSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	users: usersSlice,
	loading: loadingSlice,
	// modal: modalSlice,
	transactions: transactionsSlice,
	notification: notificationSlice,
});

export default rootReducer;
