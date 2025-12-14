'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/src/lib/supabase/client';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Проверяем, не авторизован ли уже пользователь
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Если пользователь уже авторизован, перенаправляем на админ-панель
        router.push('/admin');
      }
    });

    // Подписываемся на изменения состояния авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // После успешного входа перенаправляем на админ-панель
        router.push('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
          Вход / Регистрация
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          // Используем полный URL для redirectTo (важно для Supabase)
          redirectTo={
            typeof window !== 'undefined'
              ? `${window.location.origin}/admin`
              : '/admin'
          }
          // Включаем magic link для удобства
          magicLink={true}
          // Настройка локализации
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Пароль',
                button_label: 'Войти',
                loading_button_label: 'Вход...',
                social_provider_text: 'Войти через',
                link_text: 'Уже есть аккаунт? Войти',
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Пароль',
                button_label: 'Зарегистрироваться',
                loading_button_label: 'Регистрация...',
                social_provider_text: 'Зарегистрироваться через',
                link_text: 'Нет аккаунта? Зарегистрироваться',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

