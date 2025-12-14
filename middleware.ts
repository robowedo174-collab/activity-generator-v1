import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// В Next.js App Router, Middleware (промежуточное ПО) используется для обновления сессий Supabase.
// Для версии @supabase/supabase-js 2.87.1 используем упрощенный подход
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // В версии 2.87.1 обработка сессий через middleware требует дополнительных настроек
  // Пока просто пропускаем запросы дальше
  // Сессии будут обрабатываться в серверных компонентах через server.ts
  
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

