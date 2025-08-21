import { NextResponse } from 'next/server';
import { generateRandomState } from '@/lib/oauth';

// Config via env
const META_CLIENT_ID = process.env.META_CLIENT_ID as string;
const META_REDIRECT_URI = process.env.META_REDIRECT_URI as string; // e.g., https://seu-dominio.com/api/meta/instagram/callback

export async function GET() {
  if (!META_CLIENT_ID || !META_REDIRECT_URI) {
    return NextResponse.json({ error: 'Meta OAuth env vars missing' }, { status: 500 });
  }

  const state = generateRandomState(24);
  const scopes = [
    'public_profile',
    'pages_show_list',
    'pages_read_engagement',
    'instagram_basic',
    'instagram_manage_insights',
    'instagram_manage_comments'
  ];

  const params = new URLSearchParams({
    client_id: META_CLIENT_ID,
    redirect_uri: META_REDIRECT_URI,
    scope: scopes.join(','),
    response_type: 'code',
    state
  });

  const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;

  const res = NextResponse.redirect(authUrl);
  // Persist state via cookie para validar no callback
  res.cookies.set('meta_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600 });
  return res;
}
