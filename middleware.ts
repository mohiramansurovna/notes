import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import {DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGOUT_REDIRECT} from '@/routes';
import { NextResponse } from 'next/server';

const {auth} = NextAuth(authConfig);

export default  auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isMainRoute = nextUrl.pathname === '/';

    if (isApiAuthRoute){ 
        return NextResponse.next()
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next()
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl));
    }

    if(isMainRoute && isLoggedIn){
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))}
    if(isMainRoute && !isLoggedIn){
        return NextResponse.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl))
    }
    return NextResponse.next()
});

//there will be list of the routes, which invokes this middlewere function.
//other routes won;t be effected
// ex: ['/auth/register', '/auth/signin']
export const config = {
     // Exclude _next, static files, and any other file extensions like .jpg, .css, etc.
     matcher: ['/((?!.*\\..*|_next|static).*)', '/', '/(api|trpc)(.*)'],
};
