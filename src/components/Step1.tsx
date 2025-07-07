import { Box, TextField } from "@mui/material";
import { StepErrors, StepProps, User } from "../types/User";
import { useState } from "react";


const Step1 = ({ user, handleChange, onBur }: StepProps) => {
  const [errors, setErrors] = useState<StepErrors>({});

  const handleBlur = (field: keyof User) => () => {
    let isValid = true;

    switch (field) {
      case 'firstName':
        isValid = !!user.firstName;
        break;
      case 'lastName':
        isValid = !!user.lastName;
        break;
      case 'dateOfBirth':
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        isValid = dateRegex.test(user.dateOfBirth);
        break;
      default:
        isValid = true;
    }

    const newErrors = { ...errors, [field]: !isValid };
    setErrors(newErrors);
    onBur(newErrors);
  };



  return (
    <Box component="form" noValidate>
      <TextField
        label="First Name*"
        value={user.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        fullWidth
        margin="normal"
        onBlur={handleBlur('firstName')}
        helperText={errors.firstName ? 'First Name is required' : ''}
        error={errors.firstName}
      />
      <TextField
        label="Last Name*"
        value={user.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
        fullWidth
        margin="normal"
        onBlur={handleBlur('lastName')}
        helperText={errors.lastName ? 'Last Name is required' : ''}
        error={errors.lastName}
      />
      <TextField
        label="Date of Birth*"
        type="date"
        value={user.dateOfBirth}
        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        fullWidth
        margin="normal"
        onBlur={handleBlur('dateOfBirth')}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={errors.dateOfBirth ? 'Invalid date format or required' : ''}
        error={errors.dateOfBirth}
      />
    </Box>
  );
};

export default Step1;