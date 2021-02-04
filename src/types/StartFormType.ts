import { RouterProps } from 'react-router'; 
import { IUser } from './';

export interface StartFormProps extends RouterProps {
  setCurrentUser: (user: IUser) => void,
}
