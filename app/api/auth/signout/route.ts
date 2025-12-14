import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/src/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerComponentClient();
    
    // Выход пользователя
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Ошибка выхода:', error);
      return NextResponse.json(
        { error: error.message || 'Ошибка при выходе' },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { message: 'Выход выполнен успешно' },
      { status: 200 }
    );

    // Удаляем cookie с токеном
    response.cookies.delete('sb-access-token');

    return response;
  } catch (error) {
    console.error('Критическая ошибка при выходе:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

