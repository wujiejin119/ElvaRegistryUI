import { User } from '../types/User';

export const useUserFieldValidation = () => {

    const validateField = (user: User, field: keyof User): boolean => {
        switch (field) {
            case 'firstName':
                return !!user.firstName;
            case 'lastName':
                return !!user.lastName;
            case 'dateOfBirth':
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                return dateRegex.test(user.dateOfBirth || '');
            case 'country':
                return !!user.country;
            case 'gender':
                return !!user.gender;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(user.email || '');
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                return passwordRegex.test(user.password);
            default:
                return true;
        }
    };


    const validateStep = (user: User, step: number): boolean => {
        const stepFields: Record<number, (keyof User)[]> = {
            1: ['firstName', 'lastName', 'dateOfBirth'],
            2: ['country', 'gender'],
            3: ['email', 'password'],
        };

        const fieldsToValidate = stepFields[step] || [];
        return fieldsToValidate.every(field => validateField(user, field));
    };

    const validateFields = (user: User, fields: (keyof User)[]): boolean => 
        !fields.some(field => !validateField(user, field));

    return {
         validateField,
         validateStep,
         validateFields
        };
};


