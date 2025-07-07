import React from 'react';
import { User } from '../types/User';
import { Box, styled, Typography } from '@mui/material';


const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  textAlign: 'left'
}));

interface Step4Props {
  user: User;
  handleSubmit: (e: React.FormEvent) => void;
}

const Step4 = (props: Step4Props): JSX.Element => {
  const { user, handleSubmit } = props;
 
  const fieldLabels: Partial<Record<keyof User, string>> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfBirth: 'Date of Birth',
    country: 'Country',
    gender: 'Gender',
    email: 'Email',
    password: 'Password'
  };

  return (
    <ContentContainer component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Review Your Information:</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Object.entries(user).map(([key, value]) => {
          if (fieldLabels[key as keyof User]) {
            return (
              <Box key={key} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Box sx={{ width: '150px' }}><strong>{fieldLabels[key as keyof User]}:</strong></Box>
                <span>{key === 'password' ? '********' : value}</span>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    </ContentContainer>
  );
};

export default Step4;