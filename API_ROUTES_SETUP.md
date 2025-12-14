# 🚀 API Routes для авторизации через серверный прокси

## Что было создано

Создана система серверных API Routes для авторизации, которая работает через сервер Vercel и может помочь обойти проблемы с подключением к Supabase.

## Созданные API Routes

### 1. `/api/auth/signup` - Регистрация
- **Метод:** POST
- **Тело запроса:** `{ email: string, password: string }`
- **Ответ:** `{ user, session, message }`

### 2. `/api/auth/signin` - Вход
- **Метод:** POST
- **Тело запроса:** `{ email: string, password: string }`
- **Ответ:** `{ user, session, message }`
- **Cookies:** Устанавливает `sb-access-token` для сессии

### 3. `/api/auth/signout` - Выход
- **Метод:** POST
- **Ответ:** `{ message }`
- **Cookies:** Удаляет `sb-access-token`

### 4. `/api/auth/session` - Проверка сессии
- **Метод:** GET
- **Ответ:** `{ user, session }` или `{ user: null, session: null }`

## Как использовать

### Вариант 1: Кастомная форма (рекомендуется)

На странице `/auth` есть переключатель "Использовать серверную форму". Эта форма использует API Routes и работает через сервер Vercel.

**Преимущества:**
- ✅ Работает через сервер Vercel (не зависит от геоблокировки)
- ✅ Улучшенная безопасность
- ✅ Лучшая обработка ошибок
- ✅ Централизованная логика

### Вариант 2: Стандартная форма Supabase Auth UI

Можно использовать стандартный компонент `<Auth />` из `@supabase/auth-ui-react`, который работает напрямую с Supabase.

**Преимущества:**
- ✅ Готовая UI
- ✅ Magic links
- ✅ OAuth провайдеры (если настроены)

## Настройка

### 1. Переменные окружения

Убедитесь, что в Vercel Dashboard добавлены переменные для **всех сред** (Development, Preview, Production):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Supabase Dashboard

В Supabase Dashboard → Settings → Authentication → URL Configuration:

**Site URL:**
```
https://activity-generator-v1.vercel.app
```

**Redirect URLs:**
```
https://activity-generator-v1.vercel.app/admin
https://activity-generator-v1.vercel.app/auth
https://activity-generator-v1-git-dev-ivans-projects-5d38d541.vercel.app/admin
https://activity-generator-v1-git-dev-ivans-projects-5d38d541.vercel.app/auth
http://localhost:3000/admin
http://localhost:3000/auth
```

## Тестирование

1. Откройте: `https://activity-generator-v1.vercel.app/auth`
2. Нажмите "Использовать серверную форму (рекомендуется)"
3. Зарегистрируйте нового пользователя или войдите
4. После успешной авторизации вы будете перенаправлены на `/admin`

## Отладка

Если возникают проблемы:

1. **Проверьте логи Vercel:**
   - Vercel Dashboard → Deployments → выберите деплой → Logs
   - Ищите ошибки в API routes

2. **Проверьте консоль браузера:**
   - F12 → Console
   - Ищите ошибки при отправке запросов

3. **Проверьте Network tab:**
   - F12 → Network
   - Проверьте запросы к `/api/auth/*`
   - Проверьте статус ответов (должен быть 200)

## Важно

- API Routes работают на сервере Vercel, который находится не в России
- Это может помочь обойти проблемы с геоблокировкой
- Все запросы к Supabase идут через сервер Vercel, а не напрямую из браузера
- Это улучшает безопасность и производительность

