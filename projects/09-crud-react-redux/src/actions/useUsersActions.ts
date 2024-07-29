import { useAppDispatch } from "../hooks/store";
import { deleteUserById, addNewUser } from "../store/users/slice";
import type { UserId, User } from "../store/users/slice";

function useUserActions() {
	const dispath = useAppDispatch();

	return {
		addUser: (user: User) => {
			dispath(addNewUser(user));
		},
		removeUser: (id: UserId) => {
			dispath(deleteUserById(id));
		},
	};
}

export { useUserActions };
