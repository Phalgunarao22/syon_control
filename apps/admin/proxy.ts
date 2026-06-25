import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    // Check session using the API route (works in Edge Runtime)
    const response = await fetch(new URL("/api/auth/get-session", request.nextUrl.origin), {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });
    
    const session = response.ok ? await response.json() : null;
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login');

    if (!session) {
        // Unauthenticated users trying to access protected routes go to /login
        if (!isAuthRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        // Authenticated users trying to access /login go to /
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        
        // Example: Check permissions here using session.user.permissions if needed
    }

    return NextResponse.next();
}

// Apply middleware to all routes except api, next static files, and images
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
