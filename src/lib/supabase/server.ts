import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';

// Эта функция будет использоваться для создания Server Component Client.
// Для версии @supabase/supabase-js 2.87.1 используем стандартный createClient
// с правильной настройкой для серверных компонентов.

export const createClient = cache(() => {
  // Ключи из переменных окружения
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // P.S. В идеале здесь нужен Service Role Key, но пока используем Anon Key для простоты:
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anonymous key environment variables!');
  }

  // В версии 2.87.1 используем стандартный createClient с правильной настройкой для сервера
  // Для серверных компонентов отключаем сохранение сессии
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
});

