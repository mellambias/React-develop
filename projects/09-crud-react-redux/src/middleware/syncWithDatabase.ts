import { rollbackUser } from "../store/users/slice";
import type { UserId, UserWithId } from "../store/users/slice";
import { isAction, PayloadAction, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { RootState } from "../store";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const syncWithDatabase: Middleware<{}, RootState> =
	(storeAPI) => (next) => (action) => {
		const previusState = storeAPI.getState();
		// Actuamos en función del tipo de acción
		if (!isAction(action)) throw new Error("La acción no es correcta");
		if (action.type === "users/deleteUserById") {
			const userid: UserId = action.payload;
			console.log(userid);
			fetch(`https://jsonplaceholder.typicode.com/users/${userid}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success("Usuario eliminado");
					}
					throw new Error("No se ha podido eliminar");
				})
				.catch((error) => {
					const previousUser = previusState.users.find(
						(user: UserWithId) => user.id === userid,
					);
					if (previousUser) storeAPI.dispatch(rollbackUser(previousUser));
					toast.error(error.message);
				});
		}
		return next(action);
	};

export { syncWithDatabase };
