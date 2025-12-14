import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/src/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerComponentClient();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Вход пользователя через серверный клиент
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Ошибка входа:', error);
      return NextResponse.json(
        { error: error.message || 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Устанавливаем cookies для сессии
    const response = NextResponse.json(
      {
        user: data.user,
        session: data.session,
        message: 'Вход выполнен успешно',
      },
      { status: 200 }
    );

    // Сохраняем токен доступа в cookie (если есть сессия)
    if (data.session?.access_token) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      });
    }

    return response;
  } catch (error) {
    console.error('Критическая ошибка при входе:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

