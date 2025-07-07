import { Box, TextField } from "@mui/material";
import { StepErrors, StepProps, User } from "../types/User";
import { useState } from "react";
import { useUserFieldValidation } from "./useUserFieldValidation";


const Step1 = ({ user, handleChange, onBur }: StepProps) => {
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
        label="First Name*"
        value={user.firstName}
        onChange={(e) => handleChange('firstName', e.target.value?.trim())}
        fullWidth
        margin="normal"
        onBlur={handleBlur('firstName')}
        helperText={errors.firstName ? 'First Name is required' : ''}
        error={errors.firstName}
        data-testid="firstName"
      />
      <TextField
        label="Last Name*"
        value={user.lastName}
        onChange={(e) => handleChange('lastName', e.target.value?.trim())}
        fullWidth
        margin="normal"
        onBlur={handleBlur('lastName')}
        helperText={errors.lastName ? 'Last Name is required' : ''}
        error={errors.lastName}
       data-testid="lastName"
      />
      <TextField
        label="Date of Birth*"
        type="date"
        value={user.dateOfBirth}
        onChange={(e) => handleChange('dateOfBirth', e.target.value?.trim())}
        fullWidth
        margin="normal"
        onBlur={handleBlur('dateOfBirth')}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={errors.dateOfBirth ? 'Invalid date format or required' : ''}
        error={errors.dateOfBirth}
        data-testid="dateOfBirth"
      />
    </Box>
  );
};

export default Step1;