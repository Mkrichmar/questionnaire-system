import { AuthConfig } from './types'; // Adjust this path if needed
   

    // ... other configuration properties

export const authConfig = {
    provider: 'credentials' as const,
    clientId: process.env.NEXTAUTH_CLIENT_ID || '',
    clientSecret: process.env.NEXTAUTH_CLIENT_SECRET || '',
    
  };