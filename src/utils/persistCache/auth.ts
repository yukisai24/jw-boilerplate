import { USER_INFO_KEY } from '@/constants/authentications';
import { ICurrentUser } from '@/types/user';
import { handleDecrypt, handleEncrypt } from '@/utils/helpers/encrypt';
import PersistCache from '@/utils/persistCache';

export const saveUserToCache = (data: ICurrentUser) => {
  if (!data) {
    return '';
  }

  PersistCache.save(USER_INFO_KEY, handleEncrypt(JSON.stringify(data)));
};

export const getUserFromCache = (): ICurrentUser => {
  let response;
  try {
    response = JSON.parse(
      handleDecrypt(PersistCache.read(USER_INFO_KEY)) || '{}',
    );
  } catch {
    response = {};
  }

  return response;
};

export const clearUserFromCache = (): void => {
  PersistCache.remove(USER_INFO_KEY);
};
