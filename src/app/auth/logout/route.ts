import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  await supabase.auth.signOut();
  return NextResponse.redirect(url.origin, {
    status: 301,
  });
}
