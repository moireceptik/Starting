# Starting (v1.0.0)
Автор сборки: [Наталья Ростовская](http://natfolio.ru)

Стартовый шаблон на основе Gulp (Sass + Pug) для адаптивной верстки средних и крупных проектов.

## Сборка:

	- Gulp 4.0.2
	- Препроцессоры Pug + Sass (синтаксис .sass)
	- Jquery 3.5.1
	- Bootstrap 4.5.2
	- OpenSans (шрифт по умолчанию)
	- Минифицированные плагины (vendor.min.js, vendor.min.css)
	- Оптимизация картинок на выходе и автоматическая генерация CSS спрайтов (.png картинок)
	- Прописаны наиболее часто используемые миксины

## Установка:

```
1. Выполнить команду через терминал: **git clone https://github.com/moireceptik/Starting-1.git**
2. Установить Node Modules: **npm i**
3. Запуск: **gulp**
4. Сборка проекта в папку dist: **gulp dist**
5. Очистить кеш: **gulp clear**
```

## Дополнительные команды:

```
1. Установка GULP плагинов: **npm i gulp-pug --save-dev** (установит **gulp-pug**)
2. Удаление GULP плагинов: **npm uninstall gulp-pug** (удалит **gulp-pug**)
3. Установка пакета для проверки обновлений **npm i -g npm-check-updates** (устанавливается только 1 раз на ПК)
4. Проверка обновлений: **ncu**
5. Согласиться на обновления: **ncu -u**
6. Посмотреть список и версии установленных плагинов в проекте: **bower list**
7. Обновить все плагины в проекте: **bower update**
8. Установить плагины в проект: **bower i jquery bootstrap**, **bower install bootstrap#v4.6.0** (установит **jquery** и **bootstrap**, установит **bootstrap** нужной версии)
9. Удаление плагинов из проекта: **bower uninstall bootstrap** (удалит **bootstrap**)
10. Узнать версию GULP: **gulp -v** или Node **node -v**
11. Все .png картинки в папке app/assets/images/sprite генерируются в app/assets/images/sprite.png
12. Выводить в .sass **+sprite($s-3)**, где **($s-3)** спрайт-иконка 3.png
```

## Git for Windows
https://gitforwindows.org/
