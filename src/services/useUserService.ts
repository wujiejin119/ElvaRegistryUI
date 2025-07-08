import { useUserFieldValidation } from '../hooks/useUserFieldValidation';
import { User } from '../types/User';

const API_URL = 'http://localhost:5289/api/users';

export const useUserService = () => {
  const { validateFields } = useUserFieldValidation();
  const addUserWithAvatar = async (user: User): Promise<User> => {
    const allFields = Object.keys(user) as (keyof User)[];
    if (!validateFields(user, allFields)) {
      throw new Error('Invalid user data');
    }
    const formData = new FormData();

    for (const [key, value] of Object.entries(user)) {
      if (key === 'password') {
        const encodedPassword = btoa(value as string);
        formData.append(key, encodedPassword);
      }
      else if (key !== 'avatar') {
        formData.append(key, value);
      }
    }


    if (user.avatar) {
      formData.append('avatar', user.avatar);
    }

    const res = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Failed to add user with avatar');
    return res.json();
  };

  return {
    addUserWithAvatar
  };
};