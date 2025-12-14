'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/src/lib/supabase/client';
import { CustomAuthForm } from './custom-auth';

export default function AuthPage() {
  const router = useRouter();
  const [useCustomAuth, setUseCustomAuth] = useState(false);

  useEffect(() => {
    // Проверяем, не авторизован ли уже пользователь
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error('Ошибка при получении сессии:', error);
          return;
        }
        if (session?.user) {
          // Если пользователь уже авторизован, перенаправляем на админ-панель
          router.push('/admin');
        }
      })
      .catch((error) => {
        console.error('Критическая ошибка при проверке сессии:', error);
      });

    // Подписываемся на изменения состояния авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (event === 'SIGNED_IN' && session?.user) {
        // После успешного входа перенаправляем на админ-панель
        console.log('Пользователь успешно вошел, перенаправляем на /admin');
        router.push('/admin');
      }
      if (event === 'SIGNED_OUT') {
        console.log('Пользователь вышел');
      }
      if (event === 'TOKEN_REFRESHED') {
        console.log('Токен обновлен');
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
        
        {/* Переключатель между стандартной и кастомной формой */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setUseCustomAuth(!useCustomAuth)}
            className="text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {useCustomAuth
              ? 'Использовать стандартную форму'
              : 'Использовать серверную форму (рекомендуется)'}
          </button>
        </div>

        {useCustomAuth ? (
          <CustomAuthForm />
        ) : (
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
        )}
      </div>
    </div>
  );
}

