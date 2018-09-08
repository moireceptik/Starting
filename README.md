# Starting (v1.0.0)
Автор сборки: [Наталья Ростовская](http://natfolio.ru)

Стартовый шаблон на основе Gulp (Sass + Pug) для адаптивной верстки средних и крупных проектов.

## Сборка:

	- Gulp 3.9.1
	- препроцессоры Pug + Sass (синтаксис .sass)
	- Jquery 3.3.1
	- Bootstrap 4.1.3
	- Font Awesome 4.7.0
	- OpenSans (шрифт по умолчанию)
	- Минифицированные плагины (vendor.min.js, vendor.min.css)
	- Оптимизация картинок на выходе и автоматическая генерация CSS спрайтов
	- Прописаны наиболее часто используемые миксины

## Установка:

```
1. Выполнить команду через терминал: git clone https://github.com/moireceptik/Starting.git
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
8. Установить плагины в проект: **bower i jquery bootstrap** (установит **jquery** и **bootstrap**)
9. Удаление плагинов из проекта: **bower uninstall bootstrap** (удалит **bootstrap**)
```