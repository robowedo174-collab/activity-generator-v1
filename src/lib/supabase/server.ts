import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { cache } from 'react';

// Эта функция будет использоваться для создания Server Component Client.
// МЫ ЕЁ ПЕРЕИМЕНОВАЛИ, чтобы избежать конфликта с импортом createClient.
export const createServerComponentClient = cache(() => { 
  const cookieStore = cookies();

  // Ключи из переменных окружения
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anonymous key environment variables!');
  }

  // Используем импортированный createClient, но с настройками для сервера.
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
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

