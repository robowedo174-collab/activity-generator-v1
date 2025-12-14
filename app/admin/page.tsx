'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Проверяем текущую сессию
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error('Ошибка при получении сессии:', error);
          router.push('/auth');
          return;
        }
        if (session?.user) {
          setUser(session.user);
        } else {
          // Если пользователь не авторизован, перенаправляем на страницу входа
          router.push('/auth');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Критическая ошибка при проверке сессии:', error);
        setLoading(false);
        router.push('/auth');
      });

    // Подписываемся на изменения состояния авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session?.user) {
        router.push('/auth');
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      // Используем API route для выхода
      await fetch('/api/auth/signout', {
        method: 'POST',
      });
      router.push('/auth');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // В случае ошибки всё равно перенаправляем на страницу входа
      router.push('/auth');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Админ-панель
            </h1>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
            Добро пожаловать!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Вы успешно вошли в систему как: <strong>{user.email}</strong>
          </p>
        </div>
      </main>
    </div>
  );
}

