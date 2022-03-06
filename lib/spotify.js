import SpotifyWebApi from "spotify-web-api-node";

//spotify scopes
//https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
].join(",");
// "user-library-modify",
const param = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(param);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi(
    {
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        // redirectUri: "http://localhost:3000/api/auth/callback/spotify"
    }
)

export default spotifyApi;

export { LOGIN_URL };