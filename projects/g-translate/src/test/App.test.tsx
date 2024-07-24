import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('App works as expected', async () => {
  // simulamos un usuario
  const user = userEvent.setup();

  // nos traemos la aplicación
  const app = render(<App />);

  // traemos los elementos del DOM renderizados
  const textareaFrom = app.getByPlaceholderText('Introducir texto');

  // simulamos que el usuario escribe en el textArea
  await user.type(textareaFrom, 'Hola Mundo');

  // esperamos que exista un resultado
  const result = await app.findByDisplayValue(/Hello world/i);

  expect(result).toBeTruthy();
});
