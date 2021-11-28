import TransactionCreateStepTwo from "./TransactionCreateStepTwo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// UNITS TEST

// Test if the pay button is disabled on initial render of the component.
test('on initial render, the pay button is disabled', async () => {
  render(<TransactionCreateStepTwo sender={{id: '5'}} receiver={{id: '5'}}/>);

  expect(await screen.findByRole('button', {name: /pay/i})).toBeDisabled();
});

// Test if the pay button is enabled if the user enter an amount and a note.
test('if an amount and note is entered, the pay button is enabled',  async () => {
  render(<TransactionCreateStepTwo receiver={{id: '5'}} sender={{id: '5'}} />);
  
  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole('button', {name: /pay/i})).toBeEnabled();
});

// Test if the request button is enabled if the user enter an amount and a note.

test('if an amount and a note is entered, the request button is enabled', async () => {
  render(<TransactionCreateStepTwo receiver={{id: '5'}} sender={{id: '5'}}/>);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole('button', {name: /request/i})).toBeEnabled();
});


// INTEGRATION TESTS

test('on initial render, the pay button is disabled, and if an amount and note is entered, ' +
  'the pay and request button is enabled', async () => {
  // Arrange
  render(<TransactionCreateStepTwo receiver={{id: '5'}} sender={{id: '5'}}/>);

  // Act and Assertions
  expect(await screen.findByRole('button', {name: /pay/i})).toBeDisabled();
  expect(await screen.findByRole('button', {name: /request/i})).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole('button', {name: /pay/i})).toBeEnabled();
  expect(await screen.findByRole('button', {name: /request/i})).toBeEnabled();
});