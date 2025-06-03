export enum EUserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

export interface ICurrentUser {
  id: string;
  name: string;
  email?: string;
  role: EUserRole;
  phone?: string;
}
