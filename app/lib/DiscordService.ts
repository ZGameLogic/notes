export type DiscordAuthenticationResponse = {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

export type DiscordUserResponse = {
  id: bigint
  username: string
  avatar: string
  banner: string
  accent_color: string
}

export async function authorizeWithDiscordCode(code: string): Promise<DiscordAuthenticationResponse> {
  const res = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env['discord.client.id'] ?? '',
      client_secret: process.env['discord.client.secret'] ?? '',
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env['discord.redirect-url'] ?? '',
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord code exchange failed: ${res.status} ${text}`);
  }

  return (await res.json()) as DiscordAuthenticationResponse;
}

export async function authorizeWithDiscordRefreshToken(token: string){
  const res = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env['discord.client.id'] ?? '',
      client_secret: process.env['discord.client.secret'] ?? '',
      grant_type: 'refresh_token',
      refresh_token: token
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord token exchange failed: ${res.status} ${text}`);
  }

  return (await res.json()) as DiscordAuthenticationResponse;
}

export async function revokeToken(token: string){
  const res = await fetch('https://discord.com/api/oauth2/token/revoke', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env['discord.client.id'] ?? '',
      client_secret: process.env['discord.client.secret'] ?? '',
      token: token
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord token revoke failed: ${res.status} ${text}`);
  }
}

export async function getDiscordUserFromDiscordToken(token: string): Promise<DiscordUserResponse>{
  const res = await fetch('https://discord.com/api/users/@me', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord user exchange failed: ${res.status} ${text}`);
  }

  return (await res.json()) as DiscordUserResponse;
}