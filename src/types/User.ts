interface User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  gender: string;
  avatar: File | null;
  email: string;
  password: string;
}


interface StepProps {
  user: User;
  handleChange: (field: keyof User, value: string | File | null) => void;
  onBur: () => void;
}


interface StepErrors {
  firstName?: boolean;
  lastName?: boolean;
  dateOfBirth?: boolean;
  country?: boolean;
  gender?: boolean;
  email?: boolean;
  password?: boolean;
}


export type { User, StepProps, StepErrors};

