import { User } from '../types/User';

const API_URL = 'http://localhost:5289/api/users';

export const useUserService = () => {

  const addUser = async (user: Omit<User, 'avatar'>): Promise<User> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to add user');
    return res.json();
  };

  return {
    addUser
  };
};