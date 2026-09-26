import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

function isProtectedPath(pathname: string) {
  return pathname === "/" || pathname === "/new" || pathname.startsWith("/folder/");
}

export async function proxy(request: NextRequest) {
  const { response, user } = await createClient(request);

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
