import React, { useState } from 'react';
import { StepErrors, StepProps, User } from '../types/User';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { useUserFieldValidation } from './useUserFieldValidation';


const Step2 = ({ user, handleChange, onBur }: StepProps) => {
  const [errors, setErrors] = useState<StepErrors>({});
  const [fileError, setFileError] = useState<string>(''); 

  const { validateField } = useUserFieldValidation();

  const handleBlur = (field: keyof User) => () => {
    const isValid = validateField(user, field);
    const newErrors = { ...errors, [field]: !isValid };

    setErrors(newErrors);
    onBur(newErrors);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size <= 500 * 1024) { // 500KB
        handleChange('avatar', file);
        setFileError(''); 
      } else {
        setFileError('File size cannot exceed 500KB');
      }
    }
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
          value={user.gender}
          onChange={(e) => handleChange('gender', e.target.value.trim())}
          displayEmpty
          required
          fullWidth
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ textAlign: 'left' }}
          error={errors.gender}
          onBlur={handleBlur('gender')}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="avatar-upload" shrink>Profile Image</InputLabel>
        <Input
          type="file"
          id="avatar-upload"
          onChange={handleFileChange}
          inputProps={{
            accept: 'image/*',
            ariaLabel: 'Upload profile image'
          }}
        />
        {fileError && <FormHelperText error>{fileError}</FormHelperText>} 
      </FormControl>
    </Box>
  );
};

export default Step2;