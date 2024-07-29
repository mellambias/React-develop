import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserId = string;
interface User {
	name: string;
	email: string;
	github: string;
}

interface UserWithId extends User {
	id: UserId;
}
const DEFAULT_STATE: UserWithId[] = [
	{
		id: "1",
		name: "Miguel",
		email: "miguel@domain.org",
		github: "miguel",
	},
	{
		id: "2",
		name: "Juan",
		email: "juan@domain.org",
		github: "juan",
	},
	{
		id: "3",
		name: "Pedro",
		email: "pedro@domain.org",
		github: "pedro",
	},
	{
		id: "4",
		name: "Maria",
		email: "maria@domain.org",
		github: "maria",
	},
];

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("reduxState");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

/* 
PayloadAction es un tipo generico al que pasaremos el tipo del payload
*/
const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			/* Existen distintas estrategias
			 - Base de datos
			 - a través de un middleware
			 - en local
			*/
			const id: UserId = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id: UserId = action.payload;
			return state.filter((user: UserWithId) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyAdded = state.some(
				(user: UserWithId) => user.id === action.payload.id,
			);
			if (!isUserAlreadyAdded) {
				state.push(action.payload);
			}
		},
	},
});

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions; // .actions devuelve los reducers
export default usersSlice.reducer;
export type { User, UserWithId, UserId };
