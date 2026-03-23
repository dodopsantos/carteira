import { getAPIClient } from './axios';
import { parseCookies, destroyCookie } from 'nookies';

/**
 * Valida o JWT no servidor (getServerSideProps).
 * Retorna o user se válido, null se expirado/inválido.
 * Em caso de token inválido, destrói os cookies automaticamente.
 */
export async function validateTokenSSR(ctx: any): Promise<{ username: string; email: string; vip: boolean } | null> {
  const { 'nextauth-token': token } = parseCookies(ctx);
  if (!token) return null;

  try {
    const api = getAPIClient(ctx);
    const res = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data?.user ?? null;
  } catch {
    // Token inválido ou expirado — limpa cookies server-side
    destroyCookie(ctx, 'nextauth-token', { path: '/' });
    destroyCookie(ctx, 'nextauth-user',  { path: '/' });
    return null;
  }
}
