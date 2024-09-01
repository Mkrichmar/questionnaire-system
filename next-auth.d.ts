import NextAuth from 'next-auth'

   declare module 'next-auth' {
     interface User {
       id: string;
       name?: string | null;
       email?: string | null;
       role?: string | null;
       // Add any other properties you need
     }

     interface Session {
       user?: User;
     }

     interface JWT {
       id?: string | null;
       role?: string | null;
       name?: string | null;
       email?: string | null;
       // Add any other properties you need
     }
   }