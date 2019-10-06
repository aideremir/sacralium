# Вызовы на поединок
Приём и публикация вызовов на поединок

# Коллекции
### `duelCandidates` список пользователей, доступных к вызову на поединок
  - `_id` идентификатор пользователя
  - `character.name` имя персонажа
  - `character.power` мощность персонажа
  - `character.combatRequest.timeout` таймаут вызова на поединок для фильтрации на клиенте

### `users`
  - `character.combatRequest` запрос на поединок
    - `sender` отправитель запроса
    - `recipient` получатель запроса
    - `rejected` получатель отклонил запрос
    - `timeout` время ответа на запрос

# Методы
### `CombatRequest.send` вызов пользователя на поединок
  - `recipientUserId` идентификатор пользователя

### `CombatRequest.accept` принятие вызова

### `CombatRequest.reject` отказ от поединка

# Настройки
- `GameDesign.combatRequestTimeout` время действия вызова на поединок