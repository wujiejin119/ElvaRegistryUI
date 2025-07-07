import { StepErrors, StepProps } from '../types/User';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const Step3 = ({ user, handleChange, onBur }: StepProps) => {
  const [errors, setErrors] = useState<StepErrors>({});

  const handleBlur = (field: keyof typeof user) => () => {
    let isValid = true;

    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(user.email);
        break;
      case 'password':
        isValid = user.password.length >= 8;
        break;
      default:
        isValid = true;
    }

    const newErrors = { ...errors, [field]: !isValid  };
    setErrors(newErrors);
    onBur(newErrors);
  };

  return (
    <Box component="form" noValidate>
      <TextField
        label="Email"
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur('email')}
        helperText={errors.email ? 'Invalid email format or required' : ''}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        value={user.password}
        onChange={(e) => handleChange('password', e.target.value)}
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur('password')}
        helperText={errors.password ? 'Password must be at least 8 characters' : ''}
        error={errors.password}
      />
    </Box>
  );
};

export default Step3;