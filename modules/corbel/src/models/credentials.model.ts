import { Credentials as ICredentials } from '@etereo/auth';

export class Credentials implements ICredentials {
  accessToken: string;
  expiresAt: number; 
  refreshToken: string;
}