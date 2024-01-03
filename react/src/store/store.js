import { configureStore } from "@reduxjs/toolkit";
import spotSettingsReducer from "../features/spotSettings/spotSettingsSlice";

export const store = configureStore({
	reducer: {
		spotSettings: spotSettingsReducer,
		//...more reducers
	}
});
