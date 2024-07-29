import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducers from "./users/slice";

// Middlewares
import { syncWithDatabase } from "../middleware/syncWithDatabase";

const rootReducer = combineReducers({
	users: usersReducers,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(syncWithDatabase),
});

// Subscripciones

// Persistir lo datos en el local Store cada vez que cambie el store
store.subscribe(() => {
	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export { store };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
