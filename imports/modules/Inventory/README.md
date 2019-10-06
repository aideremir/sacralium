# Инвентарь
Управление инвентарём: покупка, надевание, снятие и выбрасывание вещей

# Коллекции
### `inventory`
  - `userId` id владельца
  - `typeId` тип вещи из /imports/content/Item

### `users`
  - `character.equipment` надетые вещи

# Методы
### `Inventory.buyItem` покупка вещи
  - `typeId` идентификатор типа вещи

### `Inventory.scrapItem` выброс вещи
  - `itemId` идентификатор экземпляра вещи

### `Inventory.equipItem` надевание вещи
  - `itemId` идентификатор экземпляра вещи

### `Inventory.unequipItem` снятие вещи
  - `slot` слот, из которого вынимаем

# функции либы
### `getBonusForCompleteElementsSet` Бонусы комплектов стихий


## Примеры использования методов
```js
import ItemTypes from '/imports/content/Item';
import InventoryCollection from '/imports/modules/Inventory/lib/collection';
```

### `Inventory.buyItem`
```js
Meteor.call('Inventory.buyItem', ItemTypes['Item/Armor/Belt/Abyss'].id, (error) => console.log(error));
Meteor.call('Inventory.buyItem', 'Item/Armor/Belt/Abyss', (error) => console.log(error));
```

### `Inventory.scrapItem`
```js
Meteor.call('Inventory.scrapItem', InventoryCollection.findOne()._id, (error) => console.log(error))
```

### `Inventory.equipItem`
```js
Meteor.call('Inventory.equipItem', InventoryCollection.findOne()._id, (error) => console.log(error))
```

### `Inventory.unequipItem`
```js
import GameDesign from '/imports/content/GameData/lib/GameDesign';

let slot = GameDesign.categoriesToSlots['Belt'];
Meteor.call('Inventory.unequipItem', slot, (error) => console.log(error))
```
