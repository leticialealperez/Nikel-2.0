import { createSlice } from '@reduxjs/toolkit';

interface ModalProps {
	open: boolean;
}

const initialState: ModalProps = {
	open: true,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: () => {
			return {
				open: true,
			};
		},
		hideModal: () => {
			return {
				open: false,
			};
		},
	},
});
export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
