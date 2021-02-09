# flightradar-clone

**Flightradar24** — публичный веб-сервис, позволяющий в реальном времени наблюдать за положением воздушных судов. Отслеживать с помощью сервиса положение воздушного судна возможно только в случае, если оно оснащёно транспондером типа ADS-B и тот включён. Сервис выводит координаты, высоту и скорость воздушного судна, а также отображает на карте пройденный путь от места вылета. При наличии информации в специализированных источниках (например, на веб-сайтах споттеров) может также отображать фотографию, тип воздушного судна, его бортовой номер, принадлежность к авиакомпании, место отправления и посадки и ряд другой информации. На сервисе ведётся запись истории полётов.
Проект-клон Flightradar выполняет такие функции:
 - отрисовка карты и маркеров воздушных судов,
 - изменение координат воздушных судов в режиме реального времени, 
 - отрисовка трека, визуализация траектории пройденного пути, 
 - получение и отображение информации о рейсе с учетом локального времени, 
 - прогнозирование расписания (вылета и прибытия), 
 - визуализация расположения маркеров аэропортов,
 - получение и отображение информации об аэропорте (погоде, расположение, фото), 
 - табло прилётов и вылетов,
 - функционал авторизации пользователя, создание его личного кабинета,
 - функционал позволяющий оформлять подписки на избранные рейсы, отслеживать их состояния, 
 - хранение стилей карты для пользователя,
 - hotkeys (сдиг карты, отображение избранных рейсов).

### Инструменты
Проект создан с помощью библиотеки **React** с использованием **Typescript**. React позволяет писать более структурированный код, разбивать его на компоненты, которые можно переиспользовать. У React хорошая документация и обширное сообщество, благодаря чему можно быстро найти ответы на многие вопросы по разработке. Основное преимущество Typescript в том, что это строго типизированный язык. Он позволяет избежать некоторых ошибок еще на этапе написания кода. Для нас минусом стал небольшой опыт работы с данными технологиями, потребовалось время, чтобы вникнуть в них.

Применяемые API:
 - flightRadar API (получение данных по аэропортам: местоположение, время, фото, рейтинг, данные о расписании; 
 по перелётам: местоположение, наименование авиаперевозчика, его логотип, фото самолета история полетов оздушного судна);
 - Open Weather Map API (данные о погоде)
 - Country Flag API  ( флаг страны по её коду)
Работа с API вызвала большие трудности, поскольку в бесплатных ресурсах было недостаточно информации для полноценной работы нашего приложения. А работать напрямую с Flight Radar нет возможности из-за ошибок cross-origin. Для решения этой проблемы мы сделали свой прокси-сервер и стали отправлять запросы через него.

Стек, который был выбран для авторизации следующий: **NodeJS (Express), Passport.js, MongoDB**.
Passport.js — распространенная библиотека для написания логики авторизации. Существует большой выбор различных стратегий авторизации из коробки. В сети достаточно туториалов и работе с данной библиотекой, а также вполне исчерпывающая документация, проясняющая детали работы.
Выбор БД пал на MongoDB, так как, в рамках необходимого функционала для нашего проекта данный инструмент целиком покрывает потребности.

