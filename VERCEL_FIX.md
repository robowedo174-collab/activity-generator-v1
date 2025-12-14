# 🔴 КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Переменные окружения для Preview

## Проблема
Переменные окружения добавлены только для **Production**, но деплой из ветки `dev` использует **Preview** окружение. Поэтому переменные не доступны и возникает ошибка "Не удалось получить данные".

## Решение

### Шаг 1: Добавить переменные для Preview и Development

1. Откройте Vercel Dashboard: https://vercel.com/dashboard
2. Выберите проект `activity-generator-v1`
3. Перейдите в **Settings** → **Environment Variables**
4. Найдите существующие переменные:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Для каждой переменной:
   - Нажмите на неё для редактирования
   - Убедитесь, что выбраны ВСЕ среды:
     - ✅ **Development**
     - ✅ **Preview** (ВАЖНО!)
     - ✅ **Production**
   - Сохраните изменения

### Шаг 2: Добавить URL Vercel в разрешенные URL Supabase

1. Откройте Supabase Dashboard: https://supabase.com/dashboard
2. Выберите проект
3. Перейдите в **Settings** → **API**
4. Найдите раздел **Allowed URLs** или **Site URL**
5. Добавьте следующие URL:
   - `https://activity-generator-v1.vercel.app`
   - `https://activity-generator-v1-git-dev-ivans-projects-5d38d541.vercel.app`
   - `http://localhost:3000` (для локальной разработки)
6. Сохраните изменения

### Шаг 3: Пересобрать проект

1. В Vercel Dashboard перейдите в **Deployments**
2. Найдите последний деплой из ветки `dev`
3. Нажмите **Redeploy**
4. Дождитесь завершения сборки

### Шаг 4: Проверка

После пересборки проверьте:
- `https://activity-generator-v1-git-dev-ivans-projects-5d38d541.vercel.app/auth`
- Ошибка "Не удалось получить данные" должна исчезнуть
- Форма авторизации должна работать

