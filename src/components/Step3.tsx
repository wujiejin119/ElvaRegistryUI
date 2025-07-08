import { StepErrors, StepProps, User } from '../types/User';
import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserFieldValidation } from '../hooks/useUserFieldValidation';

const Step3 = ({ user, handleChange, onBur }: StepProps) => {
  const [errors, setErrors] = useState<StepErrors>({});

  const { validateField } = useUserFieldValidation();

  const handleBlur = (field: keyof User) => () => {
    const isValid = validateField(user, field);
    const newErrors = { ...errors, [field]: !isValid };

    setErrors(newErrors);
    onBur();
  };

  return (
    <Box component="form" noValidate>
      <TextField
        label="Email"
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value?.trim())}
        fullWidth
        margin="normal"
        onBlur={handleBlur('email')}
        inputProps={{ maxLength: 255 }} 
        helperText={errors.email ? 'Invalid email format or required' : ''}
        error={errors.email}
        data-testid="email"
      />
      <TextField
        label="Password"
        type="password"
        value={user.password} //Todo：password confirm twice
        onChange={(e) => handleChange('password', e.target.value?.trim())}
        fullWidth
        margin="normal"        
        autoComplete="new-password" 
        onBlur={handleBlur('password')}
        inputProps={{ maxLength: 255 }} 
        helperText={errors.password ? 'At least 8 characters, with uppercase, lowercase, numbers.' : ''}
        error={errors.password}
        data-testid="password"
      />
    </Box>
  );
};

export default Step3;