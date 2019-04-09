import { Document } from 'mongoose';
/**
 * User Interfaces
 */
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ModelUser extends User {
  generateToken(): string;
  compareHash(password: string): Promise<boolean>;
}

export interface UserDocument extends Document, ModelUser {}

/**
 * Messages Interface
 */

export interface Messages {
  to: User;
  from: User;
  message: string;
}

export interface ModelMessages extends Messages {}

export interface MessagesDocument extends Document, ModelMessages {}

export enum Model {
  User = 'User',
  Messages = 'Message'
}
