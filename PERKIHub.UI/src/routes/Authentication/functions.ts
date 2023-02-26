import { User } from '../../lib/api/contracts';

export const isUser = (user: any): user is User => {
  return user?.hasOwnProperty('firstName') && user?.hasOwnProperty('lastName');
};
