export type UserRole = 'admin' | 'customer';

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  isAdmin: boolean;
}

export const ADMIN_EMAIL = 'nouiniwalid@gmail.com';
export const DEFAULT_ADMIN_PASSCODE = 'admin2026';
