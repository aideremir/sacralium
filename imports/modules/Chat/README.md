# Чат
Приём и публикация сообщений в чате

# Коллекции
### `messages`
  - `userId` id отправителя
  - `characterName` имя персонажа отправителя
  - `timestamp` дата и время
  - `text` сообщение

# Методы
### `Chat.postMessage` отправка сообщения
  - `text` текст сообщения

## Примеры использования методов
### `Chat.postMessage`
```js
Meteor.call('Chat.postMessage', 'текст сообщения', (error) => console.log(error));
```

# Настройки
- `public.chatMessageMaxLength` максимальная длина сообщения
- `private.chatHistoryLength` количество последних сообщений для публикации