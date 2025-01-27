'use client';

import { useSession } from "next-auth/react";

export default function useCurrentUser() {
    const session=useSession();
    if(!session.data?.user) return null;
    return session.data?.user;
}