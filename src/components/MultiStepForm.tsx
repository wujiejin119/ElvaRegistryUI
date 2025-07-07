
import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { StepErrors, User } from '../types/User';
import { Box, Button, Card, CardContent, CardHeader, styled } from '@mui/material';
import { useUserService } from '../services/useUserService';
import ResultPage from './ResultPage';
import { useUserFieldValidation } from '../hooks/useUserFieldValidation';

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '3px',
  width: '100%',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  height: '550px',
  backgroundColor: '#fafafa'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px 16px',
  width: '100%',
  boxSizing: 'border-box'
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  height: '32px',
}));

const StepContentContainer = styled(Box)(() => ({
  overflowY: 'auto',
  margin: '0 16px 16px',
  flexGrow: 1,
  height: '350px'
}));


const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '12px',
  height: '80px',
  overflow: 'hidden'
}));


interface MultiStepFormProps {
  initialData?: User;
}

const MultiStepForm = (props: MultiStepFormProps): JSX.Element => {
  const { initialData } = props;
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<User>(initialData || {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    gender: '',
    avatar: null,
    email: '',
    password: '',
  });

  const [pageError, setPageError] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { addUserWithAvatar } = useUserService();
  const { validateStep } = useUserFieldValidation();

  const handleChange = (field: keyof User, value: string | File | null) => {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const onBur = (errors: StepErrors) => {
    const hasError = Object.values(errors).some(value => value === true);
    setPageError(hasError);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 user={user} handleChange={handleChange} onBur={onBur} />;
      case 2:
        return <Step2 user={user} handleChange={handleChange} onBur={onBur} />;
      case 3:
        return <Step3 user={user} handleChange={handleChange} onBur={onBur} />;
      case 4:
        return <Step4 user={user} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  const prevStep = () => {
    setPageError(false);
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };
  const nextStep = () => {
    let isValid = validateStep(user, step < 4 ? step + 1 : step);
    setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
    setPageError(!isValid);
  };


  const getErrorMessage = (error: any) => {
    let errorMessage = 'An unknown error occurred';
    if (error === null || error === undefined) {
      return errorMessage;
    }

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = JSON.stringify(error);
    }

    return errorMessage;

  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errorMessage = "Unknown error occurred";
    try {
      console.log('Form Submitted:', user);
      await addUserWithAvatar(user);
      setDialogMessage("Registration successful!");
      setApiError(false);
      setIsSubmitted(true);
    } catch (error) {
      errorMessage = 'Error adding user: ' + getErrorMessage(error);
      setDialogMessage(errorMessage);
      setApiError(true);
      setIsSubmitted(true);
      console.error('Error adding user:', error);
    }
  };


  return (
    <CenteredBox>
      <StyledCard>
        <StyledCardHeader title="Welcome to Sign Up" />
        <StyledCardContent>
          <StepContentContainer>
            {isSubmitted ? (
              <ResultPage isSuccess={!apiError} message={dialogMessage} />
            ) : (
              renderStep()
            )}
          </StepContentContainer>
        </StyledCardContent>
        {!isSubmitted && <StyledButtonContainer>
          <Button
            variant="outlined"
            onClick={prevStep}
            disabled={step <= 1}
            data-testid="previous">
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={step < 4 ? nextStep : handleSubmit}
            disabled={pageError}
            data-testid="next"
          >
            {step < 4 ? "Next" : "Submit"}
          </Button>
        </StyledButtonContainer>}
      </StyledCard>
    </CenteredBox>
  );
};

export default MultiStepForm;
