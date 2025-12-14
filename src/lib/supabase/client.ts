import { createClient } from '@supabase/supabase-js';

// Получаем ключи из переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Проверяем, что ключи существуют
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage =
    'Missing Supabase URL or anonymous key environment variables! ' +
    'Пожалуйста, убедитесь, что файл .env.local содержит NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY';
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Валидация URL
try {
  new URL(supabaseUrl);
} catch (error) {
  const errorMessage = `Invalid Supabase URL: "${supabaseUrl}". Must be a valid HTTP or HTTPS URL.`;
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Создаем и экспортируем клиент Supabase для работы в браузере (клиентские компоненты)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Включаем автоматическое обновление сессии
    autoRefreshToken: true,
    // Сохраняем сессию в localStorage
    persistSession: true,
    // Обнаруживаем сессию в URL (для magic links и OAuth)
    detectSessionInUrl: true,
  },
});

