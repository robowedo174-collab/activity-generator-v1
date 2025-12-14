import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/src/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerComponentClient();
    
    // Получаем текущую сессию
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Ошибка при получении сессии:', error);
      return NextResponse.json(
        { error: error.message || 'Ошибка при получении сессии' },
        { status: 401 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { user: null, session: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        user: session.user,
        session: session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Критическая ошибка при получении сессии:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

