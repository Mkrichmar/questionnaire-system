import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your own logic here to look up the user
        // For this example, we'll just compare the credentials
        // with those hardcoded in the application
        const user = { 
            id: "1", 
            name: "J Smith", 
            email: "jsmith@example.com", 
            password: "password",
            role: "user",
        };
        if (credentials && credentials.username === user.name && credentials.password === user.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user && typeof user.id === 'string') {
        token.id = user.id;
        token.role = user.role || null;
        token.name = user.name || null;
        token.email = user.email || null;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && typeof token.id === 'string' && typeof token.role === 'string') {
        session.user = {
          id: token.id,
          name: token.name || null,
          email: token.email || null,
          role: token.role || null,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
