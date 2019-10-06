# Пользователь
Валидация регистрации, слияние различных методов аутентификации пользователя, создание персонажа.

# Коллекции
### `users`
  - `character` персонаж

# Методы
### `User.createCharacter` создание персонажа
  - `name` имя
  - `gender` пол (`"male"` / `"female"`)
  
### `User.getCharacterInfoById` получение информации о персонаже по id игрока
  - `id` идентификатор игрока

## Примеры использования методов
### `User.createCharacter`
```js
Meteor.call('User.createCharacter', 'characterName', 'male', (errors) => console.log(errors));
```
### `User.getCharacterInfoById`
```js
Meteor.call('User.getCharacterInfoById', 'userId', (errors, characterInfo) => console.log(errors, characterInfo));
```

# Настройки
- `private.facebook` настройки аутентификации через facebook
  - `appId`
  - `secret`
- `private.google` настройки аутентификации через google
  - `clientId`
  - `secret`
- `private.blankCharacter` чистый персонаж