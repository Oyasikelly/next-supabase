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

  // Attempt to sign up the user
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url.origin}/auth/callback`,
    },
  });

  // Check for errors
  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }

  // Redirect to the dashboard page on success
  return NextResponse.redirect(`${url.origin}/dashboard`, {
    status: 301,
  });
}
