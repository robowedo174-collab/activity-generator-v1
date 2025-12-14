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

    // Регистрация пользователя через серверный клиент
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/admin`,
      },
    });

    if (error) {
      console.error('Ошибка регистрации:', error);
      return NextResponse.json(
        { error: error.message || 'Ошибка при регистрации' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        user: data.user,
        session: data.session,
        message: 'Регистрация успешна. Проверьте email для подтверждения.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Критическая ошибка при регистрации:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

