import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);
  if (!session) {
    return NextResponse.rewrite(new URL("/Login", req.url));
  }
  return res;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
