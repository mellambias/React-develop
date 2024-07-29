import { Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../actions/useUsersActions";
import { useState } from "react";

function CreateNewUser() {
	const { addUser } = useUserActions();
	const [enable, setEnable] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;
		addUser({ name, email, github });
		form.reset();
		setEnable(false);
	};

	const handleChanges = (event: React.FocusEvent<HTMLInputElement>) => {
		if (event.target.value) {
			return setEnable(true);
		}
		setEnable(false);
	};
	return (
		<Card>
			<Title>Nuevo usuario</Title>
			<form onSubmit={handleSubmit}>
				<TextInput
					name="name"
					placeholder="Nombre y apellidos"
					onFocus={handleChanges}
					onBlur={handleChanges}
				/>
				<TextInput
					name="email"
					placeholder="usuario@dominio.com"
					onFocus={handleChanges}
					onBlur={handleChanges}
				/>
				<TextInput
					name="github"
					placeholder="usuario de github"
					onFocus={handleChanges}
					onBlur={handleChanges}
				/>
				<div style={{ marginTop: "10px" }}>
					<Button disabled={!enable} type="submit">
						Crear usuario
					</Button>
				</div>
			</form>
		</Card>
	);
}
export { CreateNewUser };
