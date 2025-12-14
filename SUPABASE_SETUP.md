# 🔴 КРИТИЧЕСКОЕ: Настройка Supabase для работы авторизации

## Проблема: "Не удалось получить данные"

Эта ошибка означает, что приложение не может подключиться к Supabase API. 

## Решение: Настройка разрешенных URL в Supabase Dashboard

### Шаг 1: Добавить URL вашего приложения в Supabase

1. Откройте **Supabase Dashboard**: https://supabase.com/dashboard
2. Выберите ваш проект
3. Перейдите в **Settings** → **Authentication** → **URL Configuration**
4. Найдите раздел **Site URL** и **Redirect URLs**

### Шаг 2: Настройка Site URL

В поле **Site URL** добавьте:
```
https://activity-generator-v1.vercel.app
```

### Шаг 3: Настройка Redirect URLs

В разделе **Redirect URLs** добавьте следующие URL (каждый с новой строки):

```
https://activity-generator-v1.vercel.app/admin
https://activity-generator-v1.vercel.app/auth
https://activity-generator-v1-git-dev-ivans-projects-5d38d541.vercel.app/admin
https://activity-generator-v1-git-dev-ivans-projects-5d38d541.vercel.app/auth
http://localhost:3000/admin
http://localhost:3000/auth
```

### Шаг 4: Сохранить изменения

Нажмите **Save** внизу страницы.

### Шаг 5: Проверка переменных окружения в Vercel

Убедитесь, что в Vercel Dashboard переменные окружения добавлены для **Production**:

1. Откройте Vercel Dashboard: https://vercel.com/dashboard
2. Выберите проект `activity-generator-v1`
3. Перейдите в **Settings** → **Environment Variables**
4. Проверьте, что обе переменные добавлены для **Production**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Шаг 6: Пересобрать проект

После настройки Supabase:
1. В Vercel Dashboard перейдите в **Deployments**
2. Найдите последний деплой
3. Нажмите **Redeploy**
4. Дождитесь завершения сборки

## После настройки

После выполнения всех шагов:
1. Откройте: `https://activity-generator-v1.vercel.app/auth`
2. Зарегистрируйте нового пользователя или войдите
3. После успешной авторизации вы будете автоматически перенаправлены на `/admin`
4. Ошибка "Не удалось получить данные" должна исчезнуть

## Важно

- **НЕ** нужно перенаправляться на `https://supabase.com` - это сайт сервиса, а не ваше приложение
- После авторизации пользователь должен попасть на `/admin` в вашем приложении
- Supabase - это сервис для авторизации, а не целевая страница

