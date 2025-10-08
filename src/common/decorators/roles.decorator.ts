import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'admin',
  PROFESOR = 'profesor',
  ESTUDIANTE = 'estudiante',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
