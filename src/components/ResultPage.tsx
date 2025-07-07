import { Box, Typography, styled } from '@mui/material';

interface ResultPageProps {
  isSuccess: boolean;
  message: string;
}

const ResultContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const ResultText = styled(Typography)<{ $isSuccess: boolean }>(({ theme, $isSuccess }) => ({
  color: $isSuccess ? 'green' : 'red',
  textAlign: 'center',
  marginBottom: '16px',
}));

const ResultPage = ({ isSuccess, message }: ResultPageProps) => {
  return (
    <ResultContainer>
      <ResultText $isSuccess={isSuccess} variant="h6">
        {message}
      </ResultText>
    </ResultContainer>
  );
};

export default ResultPage;