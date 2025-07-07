import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiStepForm from '../MultiStepForm';
import { User } from '../../types/User';

// Mock services and hooks
jest.mock('../services/useUserService', () => ({
  useUserService: () => ({
    addUserWithAvatar: jest.fn().mockResolvedValue({}),
  }),
}));

jest.mock('./useUserFieldValidation', () => ({
  useUserFieldValidation: () => ({
    validateStep: jest.fn((stepData) => {
      // Simulate validation logic: all fields must not be empty
      return Object.values(stepData).every(value => value !== '');
    }),
    validateField: jest.fn((fieldName, value) => {
      // Simulate field validation
      if (value === '') {
        return false; // Empty value is invalid
      }
      if (fieldName === 'email' && !value.includes('@')) {
        return false; // Email format validation
      }
      return true;
    }),
  }),
}));

describe('MultiStepForm Integration Test', () => {
  const initialData: User = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    gender: '',
    avatar: null,
    email: '',
    password: '',
  };

  test('Completes all steps and successfully submits the form', async () => {
    const mockAddUserWithAvatar = jest.fn().mockResolvedValue({ success: true });
    
    // Mock the useUserService hook to use the mock function
    jest.mock('../services/useUserService', () => ({
      useUserService: () => ({
        addUserWithAvatar: mockAddUserWithAvatar,
      }),
    }));

    // Render the component
    render(<MultiStepForm />);

    // Step 1
    const firstNameInput = screen.getByTestId('firstName');
    const lastNameInput = screen.getByTestId('lastName');
    const dateOfBirthInput = screen.getByTestId('dateOfBirth');

    fireEvent.input(firstNameInput, { target: { value: 'John' } });
    fireEvent.blur(firstNameInput);

    fireEvent.input(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.blur(lastNameInput);

    fireEvent.input(dateOfBirthInput, { target: { value: '2000-01-01' } });
    fireEvent.blur(dateOfBirthInput);

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Step 2
    const countryInput = screen.getByTestId('country');
    const genderInput = screen.getByTestId('gender');

    fireEvent.input(countryInput, { target: { value: 'USA' } });
    fireEvent.blur(countryInput);

    fireEvent.input(genderInput, { target: { value: 'Male' } });
    fireEvent.blur(genderInput);

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Step 3
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    fireEvent.input(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.blur(emailInput);

    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    fireEvent.blur(passwordInput);

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Step 4
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify the successful submission prompt
    const successMessage = await screen.findByText(/Registration successful!/i);
    expect(successMessage).toBeInTheDocument();
    expect(mockAddUserWithAvatar).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
      country: 'USA',
      gender: 'Male',
      email: 'john@example.com',
      password: 'password123'
    }));
  });
});