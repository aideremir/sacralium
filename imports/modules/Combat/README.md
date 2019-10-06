# Поединки
Обработка поединков

# Коллекции
### `combats`
  - `state` текущее состояние поединка
  - `participants` массив идентификаторов пользователей-участников
  - `userActions` действия пользователей на ближайший ход
  - `timeout` время до автоматического завершения хода
  - `turnSkips` счётчики пропущенных ходов участников
  - `winnerId` идентификатор победителя

### `combatParticipants` список пользователей, участвующих в бою
### `users`
  - `character.combat._id` текущий поединок
  - `character.combat.health` текущее здоровье
  - `character.combat.armorActive` текущая активная броня

# Методы
### `Combat.makeMove` сохранить действия на ближайший ход
  - `attackZone` куда атаковать
  - `defenseZone` где блокировать

## Примеры использования методов
### `Combat.makeMove`
```js
import GameDesign from '/imports/content/GameData/lib/GameDesign';

const attackZone = GameDesign.attackZones[0];
const defenseZone = GameDesign.defenseZones[0];
Meteor.call('Combat.makeMove', attackZone, defenseZone, (errors) => console.log(errors));
```

# Настройки
- `GameDesign.combatTurnTimeout` длительность хода
- `GameDesign.attackZones` зоны для атаки
- `GameDesign.defenseZones` зоны для блока
- `GameDesign.combatTurnSkipsLimit` количество пропущенных ходов до поражения