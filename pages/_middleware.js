import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    // token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    //allow the request if the following is true
    // 1.its a req for next-auth seeesion and provider fetching
    // 2. the token exist
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //redirect them to login page if thet dont have token and are requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login')
    }
}