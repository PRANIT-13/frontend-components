import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from '../components/InputField';
import { useState } from 'react';

it('renders label and associates it with input', () => {
  render(<InputField label="Email" placeholder="you@example.com" />);
  const input = screen.getByPlaceholderText('you@example.com');
  const label = screen.getByText('Email');
  expect(label).toHaveAttribute('for', input.id);
});

it('shows error state when invalid', () => {
  render(<InputField invalid errorMessage="Required" />);
  expect(screen.getByText('Required')).toBeInTheDocument();
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('aria-invalid', 'true');
});

it('supports controlled value', async () => {
  const user = userEvent.setup();

  function ControlledInput() {
    const [value, setValue] = useState('');
    return <InputField value={value} onChange={(e) => setValue(e.target.value)} />;
  }

  render(<ControlledInput />);
  const input = screen.getByRole('textbox');
  await user.type(input, 'abc');
  expect(input).toHaveValue('abc');
});

it('disables input when disabled is true', () => {
  render(<InputField disabled placeholder="Name" />);
  expect(screen.getByPlaceholderText('Name')).toBeDisabled();
});

it('shows loading spinner when loading', () => {
  render(<InputField loading />);
  expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
});
