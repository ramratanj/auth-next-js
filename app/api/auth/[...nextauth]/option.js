import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log("GitHub Profile:", profile);

        let userRole = "GitHub User";
        if (profile?.email === "ramratanjakhar59@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        console.log("Google Profile:", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Token:", token);
      console.log("User:", user);

      if (user) token.role = user.role;

      return token;
    },
    async session({ session, token }) {
      console.log("Session Token:", token);

      if (session?.user) {
        session.user.role = token?.role || "defaultRole";
      }

      return session;
    },
  },
};

export default options;
