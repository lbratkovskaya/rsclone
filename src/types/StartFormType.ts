import { IUser } from './';

export interface StartFormProps {
  getCurrentUser: () => IUser,
  onLoginRedirectHandler: () => void,
}
