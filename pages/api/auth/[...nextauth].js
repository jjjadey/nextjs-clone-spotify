import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

const refreshAccessToken = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        // get new refresh token (may be the same or new one)
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken(); //rename body to refreshedToken
        console.log("refresh token is", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken, //replace if new one come back, else fall back to old refresh token       
        }
    }
    catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

// https://next-auth.js.org/getting-started/example#existing-project
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    // secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // Initial sign in
            //https://next-auth.js.org/tutorials/refresh-token-rotation
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, //we are handling expiry times in ms*1000 (access tokens expire after 3600ms=1 hour)
                }
            }

            // return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log('Existing access token is valid');
                return token;
            }

            //access token expired, so we need to refresh it
            console.log('Access token has expride, refreshing...');
            return await refreshAccessToken(token);
        },

        //user can see session but can't see token
        //token is http only which means that your js from the client can't read that cookie (it's a hidden cookie)
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    }
})