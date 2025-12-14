import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';

// Эта функция будет использоваться для создания Server Component Client.
// МЫ ЕЁ ПЕРЕИМЕНОВАЛИ, чтобы избежать конфликта с импортом createClient.
// В версии 2.87.1 опция cookies не поддерживается в createClient, используем базовую конфигурацию
export const createServerComponentClient = cache(() => { 
  // Ключи из переменных окружения
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anonymous key environment variables!');
  }

  // Используем импортированный createClient, но с настройками для сервера.
  // В версии 2.87.1 опция cookies не поддерживается, поэтому используем базовую конфигурацию
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
});

