import { createContext} from 'react';
import { User } from'../util/types';

const initialState = {
  username: '',
  accessToken: '',
  refreshToken: '',
  displayName: '',
  spotifyId: '',
  profileImageUrl: ''
}
export const UserContext = createContext<User>(initialState);