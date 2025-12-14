# Инструкция по настройке переменных среды в Vercel

## Переменные среды для добавления

Добавьте следующие переменные среды в настройках проекта `activity-generator-v1` в Vercel Dashboard:

### Для всех сред (Development, Preview, Production):

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Значение: `https://knopbttkkbnxifwbwxqsj.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Значение: `sb_publishable_zHC_PEF2lpCQ3f9EzAY4WA_q7M-OG7N`

## Шаги для добавления переменных среды:

1. Откройте Vercel Dashboard: https://vercel.com/dashboard
2. Выберите проект `activity-generator-v1`
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте каждую переменную:
   - Нажмите **Add New**
   - Введите имя переменной (например, `NEXT_PUBLIC_SUPABASE_URL`)
   - Введите значение
   - Выберите среды: **Development**, **Preview**, **Production**
   - Нажмите **Save**
5. Повторите для второй переменной
6. После добавления всех переменных, перейдите в **Deployments** и нажмите **Redeploy** на последнем деплое (или создайте новый коммит для автоматического деплоя)

## Проверка после деплоя:

1. Откройте: `https://activity-generator-v1.vercel.app/auth`
2. Страница должна загрузиться без ошибки 404
3. Попробуйте зарегистрировать нового пользователя

