import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiStepForm from '../MultiStepForm';
import { User } from '../../types/User';
import userEvent from '@testing-library/user-event';

// // Mock services and hooks
// jest.mock('../services/useUserService', () => ({
//   useUserService: () => ({
//     addUserWithAvatar: jest.fn().mockResolvedValue({}),
//   }),
// }));

// jest.mock('../hooks/useUserFieldValidation', () => ({
//   useUserFieldValidation: () => ({
//     validateStep: jest.fn((stepData) => {
//       // Simulate validation logic: all fields must not be empty
//       return Object.values(stepData).every(value => value !== '');
//     }),
//     validateField: jest.fn((fieldName, value) => {
//       // Simulate field validation
//       if (value === '') {
//         return false; // Empty value is invalid
//       }
//       if (fieldName === 'email' && !value.includes('@')) {
//         return false; // Email format validation
//       }
//       return true;
//     }),
//   }),
// }));

describe('MultiStepForm Integration Test2',
  () => {
    // Test 1: Initial render shows the first step form, and "Previous" button is disabled
    test('initially renders the first step form with "Previous" button disabled', () => {
      render(<MultiStepForm />);

      // Verify first step fields exist
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('dateOfBirth')).toBeInTheDocument();

      // Verify button states
      expect(screen.getByTestId('previous')).toBeDisabled(); // Previous disabled
      expect(screen.getByTestId('next')).toBeDisabled(); // Next initially disabled (controlled by validation later)
    });


    test('enables "Next" button when firstName, lastName, and dateOfBirth are filled (sync with blur)', () => {
      render(<MultiStepForm />);

      const nextButton = screen.getByTestId('next');

      const firstNameInputBylabel = screen.getByLabelText('First Name*');
      const lastNameInputBylabel = screen.getByLabelText('Last Name*');
      const dobInputBylabel = screen.getByLabelText('Date of Birth*');

      expect(nextButton).toBeDisabled();

      fireEvent.change(firstNameInputBylabel, { target: { value: 'John' } });
      fireEvent.blur(firstNameInputBylabel);

      fireEvent.change(lastNameInputBylabel, { target: { value: 'Doe' } });
      fireEvent.blur(lastNameInputBylabel);

      fireEvent.change(dobInputBylabel, { target: { value: '1990-01-01' } });
      fireEvent.blur(dobInputBylabel);


      expect(nextButton).toBeEnabled();
    });



    // Tests the complete flow from Step 1 to Step 4, verifying successful submission for the form
    test('completes full flow from Step 1 to Step 4 and verifies submission', async () => {
      const user = userEvent.setup();
      render(<MultiStepForm />);
      let nextButton = screen.getByTestId('next');
      const previousButton = screen.getByTestId('previous');

      expect(previousButton).toBeDisabled();
      expect(nextButton).toBeDisabled();

      const firstNameInput = screen.getByLabelText('First Name*');
      const lastNameInput = screen.getByLabelText('Last Name*');
      const dobInput = screen.getByLabelText('Date of Birth*');

      await user.type(firstNameInput, 'John');
      fireEvent.blur(firstNameInput);
      await user.type(lastNameInput, 'Doe');
      fireEvent.blur(lastNameInput);
      await user.type(dobInput, '1990-01-01');
      fireEvent.blur(dobInput);

      expect(nextButton).toBeEnabled();
      await user.click(nextButton);

      expect(previousButton).toBeEnabled();
      expect(nextButton).toBeDisabled();

      const countryInput = screen.getByLabelText('Country*');
      const genderSelect = screen.getByTestId('gender');

      genderSelect.style.pointerEvents = 'auto';
      fireEvent.input(countryInput, { target: { value: 'China' } });
      fireEvent.blur(countryInput);

      expect(genderSelect).toBeInTheDocument();
      await userEvent.click(genderSelect);
      // await waitFor(() => {
      //   const maleOption = screen.getByText('Male');
      //   expect(maleOption).toBeInTheDocument();
      // });

      // await new Promise(resolve => setTimeout(resolve, 100));
      // const option = await screen.findByText('Male');
      //const maleOption = await screen.findByTestId('gender-male');
      const maleOption = await screen.findByText('Male', {}, { timeout: 3000 });

      // not able to workaround the issue with the MUI Select yet/
      // it is said the menu items are rendered in a portal outside the main DOM hierarchy.
      // but screen.findByText still does not work

    });

  }


);