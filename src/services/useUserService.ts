import { User } from '../types/User';

const API_URL = 'http://localhost:5289/api/users';

export const useUserService = () => {

  const addUserWithAvatar = async (user: User): Promise<User> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(user)) {
      if (key !== 'avatar') {
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