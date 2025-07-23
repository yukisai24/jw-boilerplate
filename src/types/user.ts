export enum EUserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum ELicenseType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export enum ELicenseStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
}

export interface ILicense {
  id: string;
  type: ELicenseType;
  status: ELicenseStatus;
  startDate: string;
  endDate: string;
  maxUsers?: number;
  features: string[];
}

export interface ICurrentUser {
  id: string;
  name: string;
  email?: string;
  role: EUserRole;
  phone?: string;
  shouldChangePassword: boolean;
  license?: ILicense;
}
