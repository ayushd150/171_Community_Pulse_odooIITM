// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('sb-access-token');
  const url = request.nextUrl.clone();

  if (!token && url.pathname.startsWith('/admin')) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
