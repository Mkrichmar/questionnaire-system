import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            console.log("Authorize function called with credentials:", credentials);
          // Add your own logic here to look up the user
          // For this example, we'll just compare the credentials
          // with those hardcoded in the application
          const users = [
            { id: "1", name: "J Smith", email: "jsmith@example.com", password: "password123", role: "user" },
            { id: "2", name: "Jane Doe", email: "janedoe@example.com", password: "anotherpass", role: "admin"},
          ];
          const user = users.find(
            (user) => user.email === credentials?.username && user.password === credentials?.password
          );
  
          if (user) {
            console.log("User found:", user);
            return user;
          }
          return null;
        },
      }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            console.log("JWT callback called with token:", token, "and user:", user);
            if (user && typeof user.id === 'string') {
                token.id = user.id;
                token.role = user.role || null;
                token.name = user.name || null;
                token.email = user.email || null;
            }
            console.log("Updated token:", token);
            return token;
        },
        session: ({ session, token }) => {
            console.log("Session callback called with session:", session, "and token:", token);
            if (token && typeof token.id === 'string' && typeof token.role === 'string') {
                session.user = {
                  id: token.id,
                  name: token.name || null,
                  email: token.email || null,
                  role: token.role || null,
                };
              }
            console.log("Updated session:", session);
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
});

