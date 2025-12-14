import { createServerClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// В Next.js App Router, Middleware (промежуточное ПО) используется для обновления сессий Supabase.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res;
  }

  // Создаем клиент, который умеет обновлять сессии
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
      set(name: string, value: string, options) {
        req.cookies.set({
          name,
          value,
          ...options,
        });
        res.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options) {
        req.cookies.set({
          name,
          value: '',
          ...options,
        });
        res.cookies.set({
          name,
          value: '',
          ...options,
        });
      },
    },
  });

  // Обновляем сессию. Supabase будет читать куки из запроса (req) 
  // и устанавливать новые/обновленные куки в ответе (res).
  await supabase.auth.getSession();

  return res;
}

// Указываем, какие пути должны проходить через этот Middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

