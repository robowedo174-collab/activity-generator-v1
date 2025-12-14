import { createServerClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { cache } from 'react';

// Эта функция будет использоваться для создания Server Component Client.
// Она берет куки из запроса (доступны только на сервере) и передает их Supabase.
// Это позволяет Server Components безопасно читать данные, связанные с текущим пользователем.

export const createClient = cache(() => {
  const cookieStore = cookies();

  // Ключи из переменных окружения
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // P.S. В идеале здесь нужен Service Role Key, но пока используем Anon Key для простоты:
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anonymous key environment variables!');
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        // Устанавливаем куки в ответе, чтобы Supabase мог запомнить сессию
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
});

