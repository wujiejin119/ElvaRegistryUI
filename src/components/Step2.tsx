import React, { useState } from 'react';
import { StepErrors, StepProps } from '../types/User';
import { Box, TextField, Select, MenuItem } from '@mui/material';


const Step2 = ({ user, handleChange, onBur }: StepProps) => {
  const [errors, setErrors] = useState<StepErrors>({});

  const handleBlur = (field: keyof typeof user) => () => {
    let isValid = true;

    switch (field) {
      case 'country':
        isValid = !!user.country;
        break;
      case 'gender':
        isValid = !!user.gender;
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
        label="Country"
        value={user.country}
        onChange={(e) => handleChange('country', e.target.value)}
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
          onChange={(e) => handleChange('gender', e.target.value)}
          displayEmpty
          required
          fullWidth
          inputProps={{ 'aria-label': 'Without label' }}
          error={errors.gender}
          onBlur={handleBlur('gender')}
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