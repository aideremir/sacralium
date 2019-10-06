# Персонаж
Вспомогательные функции для характеристик и атрибутов

# Настройки
- `GameDesign.powerWeights` коэффициенты для рассчёта мощности персонажа

# Методы
### `Character.setAttributes` распределение свободных очков характеристик
  - `incAttributes` идентификаторы и значения изменяемых атрибутов

## Примеры использования методов

### `Character.setAttributes`
```js
Meteor.call(
  'Character.setAttributes',
  {
    'Attribute/Primary/Intuition': 1,
    'Attribute/Primary/Strength': -2,
  }, 
  (errors, freeAttributesPoints) => console.log(errors || '', freeAttributesPoints)
);
```

# Системные функции

## в либе

```js
import CharacterManager from '/imports/modules/Character/lib/Manager';
```

### сколько у игрока остается свободных для распределения очков характеристик
```js
getFreeAttributePoints();
```

### сколько опыта требуется до левел-апа, возвращает диапазоном от нижней границы до верхней <Object={min, max}>
```js
getExperiencesRange();
```

## серверные

```js
import CharacterManager from '/imports/modules/Character/server/Manager';
```
# Добавление опыта игроку
```js
CharacterManager.incExperience({ user, deltaExperience })
```

