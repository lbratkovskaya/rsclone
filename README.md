# flightradar-clone

**Flightradar24** — публичный веб-сервис, позволяющий в реальном времени наблюдать за положением воздушных судов. Отслеживать с помощью сервиса положение воздушного судна возможно только в случае, если оно оснащёно транспондером типа ADS-B и тот включён. Сервис выводит координаты, высоту и скорость воздушного судна, а также отображает на карте пройденный путь от места вылета. При наличии информации в специализированных источниках (например, на веб-сайтах споттеров) может также отображать фотографию, тип воздушного судна, его бортовой номер, принадлежность к авиакомпании, место отправления и посадки и ряд другой информации. На сервисе ведётся запись истории полётов.
Проект клон Flightradar выполняет такие функции:
 - отрисовка карты и маркеров воздушных судов
 - изменение координат воздушных судов в режиме реального времени, 
 - отрисовка трека, визуализация траектории пройденного пути, 
 - получение и отображение информации о рейсе с учетом локального времени, 
 - прогнозирование расписания (вылета и прибытия), 
 - визуализация расположения маркеров аэропортов,
 - получение и отображение информации об аэропорте (погоде, расположение, фото), 
 - табло прилётов и вылетов,
 - функционал авторизации пользователя, создание его личного кабинета
 - функционал позволяющий оформлять подписки на избранные рейсы, отслеживать их состояния, 
 - хранение стилей карты для пользователя, 
 - hotkeys (сдиг карты, отображение избранных рейсов).

### Инструменты
Проект создается на фреймворке React с использованием Typescript. Применяемые Api:
 - flightRadar API (получение данных по аэропортам: местоположение, время, фото, рейтинг, данные о расписании; 
 по перелётам: местоположение, наименование авиаперевозчика, его логотип, фото самолета история полетов оздушного судна);
 - Open Weather Map API (данные о погоде)
 - Country Flag API  ( флаг страны по её коду)
Работа с flightRadar API осуществляется через внутренний proxy server
Для back-end используется фреймворк **Express**. Также применяется система управления базами данных **MongoDB**.
