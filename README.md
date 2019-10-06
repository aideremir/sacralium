# Подготовка к работе
1. Git
   1. [Установить git](https://git-scm.com/downloads)
      - (Опционально, Windows) [Установить TortoiseGit](https://tortoisegit.org/download/)
2. Github
   1. [Зарегистрироваться на atlassian.net](https://atlassian.net/)
   2. [Получить права в проекте](https://bitbucket.org/morula16/sacralium)
   3. Сгенерировать SSH ключ
      - (Для Windows) [Скачать puttygen.exe](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
   4. [Загрузить SSH ключ](Опционально)
3. Склонировать репозиторий: ```git@bitbucket.org:morula16/sacralium.git```
4. [Установить Meteor](https://www.meteor.com/install)
5. (Опционально, Windows) Добавить в исключения антивируса всё связанное с работой
   - Папки, meteor, node, IDE. "Защитник Windows" может дать замедление запуска в 20 и более раз

# Запуск проекта
1. Открываем командную строку и заходим в папку проекта
   - Для Windows рекоммендую "Bash on windows" (добавлю инструкцию по запросу, @Zav)
2. Устанавливаем зависимости: ```meteor npm install```
3. Запускаем проект: ```meteor npm run start```

# Настройки IDE
1. Кодировка: UTF-8
2. Перенос строк: LF (Unix)
3. Отступы: Пробелы, 2
4. Подключить ESLint для отображения несоответствия стиля кода в реальном времени

# Команды
- ```meteor npm run lint``` — проверка кода ESLint'ом и вывод ошибок в консоль
- ```meteor npm run storybook``` — Запуск просмотра компонентов системы (см ниже!)
- ```meteor npm run storybook-build``` — Сборка просмотрщика компонентов для независимой развертки в папку ".out"

# Storybook
Storybook — инструмент для просмотры компонентов проекта.

Для работы требуется установить дополнительные зависимости: ```meteor npm install .storybook --no-save```.

Скорее всего вам это не нужно. Установка всех компонентов несколько **затормозит скорость работы**.

# Развертка системы
На время разработки система разворачивается на базе [Meteor Galaxy](https://galaxy.meteor.com/) и [MongoDB Atlas](https://cloud.mongodb.com)
1. Копируете settings.sample.json в settings.json
2. Заполняете поля данными из Atlas
3. ```DEPLOY_HOSTNAME=eu-west-1.galaxy-deploy.meteor.com meteor deploy sacralium.eu.meteorapp.com --settings settings.json```

# Структура проекта
    .
    ├── .meteor        # Зависимости системы, текущая версия
    │   └── local      # Локальные временные файлы. БД, кэш и т.п.
    ├── node_modules   # NPM модули
    ├── .storybook     # Конфигурация просмотрщика компонентов
    ├── imports        # Весь код проекта находится в этой дирректории
    │   ├── client/ui  # Frontend, компоненты
    │   ├── modules    # Модули системы
    │   └── content    # Сущности игры: оружие, зелья, предметы и т.п.
    ├── client/main.js # Инициализация клиентского кода
    ├── server/main.js # Инициализация серверного кода
    ├── public         # Статичные файлы: графика, звуки
    └── settings.js    # Созданный из settings.sample.json файл настроек

# Решение проблем
### Windows 10
При возникновении ошибки:
```
...Could not load the Visual C++ component "VCBuild.exe"
To fix this, 1) install the .NET Framework 2.0 SDK, 2) install Microsoft Visual Studio 2005 or 3) add the location of the component to the system path if it is installed elsewhere.
```
Установить глобально пакет `windows-build-tools`
```
npm install --global windows-build-tools
```
