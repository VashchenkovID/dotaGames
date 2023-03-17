import { get, post } from '../../api';
import { UserInitResponseType } from '../models/UserInitService';

export default {
  loadUserInit: (): Promise<UserInitResponseType> => get(''),
  loadAuthUser: (auth: any) => post('', auth),
  loadAllUsers: () => get(''),
  loadCurrentUsers: () => get(''),
};
