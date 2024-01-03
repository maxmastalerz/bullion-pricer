import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currencyCode: (window.localStorage.getItem('currencySelected') || 'USD')
};

export const spotSettingsSlice = createSlice({
	name: 'spotSettings',
	initialState,
	reducers: {
		changeCurrency: (state, action) => {
			const currencyCode = action.payload;
			state.currencyCode = currencyCode; // Immutable via Immer.
		}
	}
});

export const { changeCurrency } = spotSettingsSlice.actions;

export default spotSettingsSlice.reducer;