import { createBrowserClient } from '@supabase/supabase-js';

// Получаем ключи из переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Проверяем, что ключи существуют
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anonymous key environment variables!');
}

// Создаем и экспортируем клиент Supabase для работы в браузере (клиентские компоненты)
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey,
);

