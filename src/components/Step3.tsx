import { StepErrors, StepProps, User } from '../types/User';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useUserFieldValidation } from './useUserFieldValidation';

const Step3 = ({ user, handleChange, onBur }: StepProps) => {
  const [errors, setErrors] = useState<StepErrors>({});

  const { validateField } = useUserFieldValidation();

  const handleBlur = (field: keyof User) => () => {
    const isValid = validateField(user, field);
    const newErrors = { ...errors, [field]: !isValid };
    
    setErrors(newErrors);
    onBur(newErrors); 
  };

  return (
    <Box component="form" noValidate>
      <TextField
        label="Email"
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value?.trim())}
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur('email')}
        helperText={errors.email ? 'Invalid email format or required' : ''}
        error={errors.email}
        data-testid="email"
      />
      <TextField
        label="Password"
        type="password"
        value={user.password} //Todo：encryption
        onChange={(e) => handleChange('password', e.target.value?.trim())}
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur('password')}
        helperText={errors.password ? 'Password must be at least 8 characters' : ''}
        error={errors.password}
        data-testid="password"
      />
    </Box>
  );
};

export default Step3;