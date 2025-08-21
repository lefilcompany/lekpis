import { NextRequest, NextResponse } from 'next/server';

const META_CLIENT_ID = process.env.META_CLIENT_ID as string;
const META_CLIENT_SECRET = process.env.META_CLIENT_SECRET as string;
const META_REDIRECT_URI = process.env.META_REDIRECT_URI as string;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`/conexoes?status=error&provider=instagram&message=${encodeURIComponent(error)}`);
  }

  const cookieState = req.cookies.get('meta_oauth_state')?.value;
  if (!code || !state || !cookieState || state !== cookieState) {
    return NextResponse.redirect('/conexoes?status=error&provider=instagram&message=invalid_state');
  }

  if (!META_CLIENT_ID || !META_CLIENT_SECRET || !META_REDIRECT_URI) {
    return NextResponse.redirect('/conexoes?status=error&provider=instagram&message=server_config');
  }

  try {
    const params = new URLSearchParams({
      client_id: META_CLIENT_ID,
      client_secret: META_CLIENT_SECRET,
      redirect_uri: META_REDIRECT_URI,
      code
    });

    const tokenRes = await fetch(`https://graph.facebook.com/v21.0/oauth/access_token?${params.toString()}`, {
      method: 'GET'
    });

    if (!tokenRes.ok) {
      const txt = await tokenRes.text();
      return NextResponse.redirect(`/conexoes?status=error&provider=instagram&message=${encodeURIComponent(txt)}`);
    }

    const tokenJson = await tokenRes.json();
    // tokenJson: { access_token, token_type, expires_in }

    // TODO: Trocar por persistência segura (DB). Aqui mockamos via cookie apenas para demo.
    const res = NextResponse.redirect('/conexoes?status=success&provider=instagram');
    res.cookies.set('meta_access_token', tokenJson.access_token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: tokenJson.expires_in || 3600 });
    res.cookies.delete('meta_oauth_state');
    return res;
  } catch (e: any) {
    return NextResponse.redirect(`/conexoes?status=error&provider=instagram&message=${encodeURIComponent(e?.message || 'unknown')}`);
  }
}
