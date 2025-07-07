import React, { useState } from 'react';
import { StepErrors, StepProps, User } from '../types/User';
import { Box, TextField, Select, MenuItem } from '@mui/material';
import { useUserFieldValidation } from './useUserFieldValidation';


const Step2 = ({ user, handleChange, onBur }: StepProps) => {
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
        label="Country"
        value={user.country}
        onChange={(e) => handleChange('country', e.target.value.trim())}
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur('country')}
        helperText={errors.country ? 'Country is required' : ''}
        error={errors.country}
      />
      <Box sx={{ width: '100%', marginTop: '16px' }}>
        <Select
          value={user.gender || 'Male'}
          onChange={(e) => handleChange('gender', e.target.value.trim())}
          displayEmpty
          required
          fullWidth
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ textAlign: 'left' }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Step2;