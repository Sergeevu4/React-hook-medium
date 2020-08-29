import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// Выступает в роли хранения и передачи данных среди компонентов, что-то типо Redux
import { CurrentUserProvider } from 'contexts/correntUser'
import Routes from 'routes'
import TopBar from 'components/TopBar'
import CurrentUserChecker from 'components/CurrentUserChecker'

/*
  Пример: http://angular.realworld.io/

  Файловая Структура и Архитектура проекта:

  /pages -> Страница проекта
    article/ -> страница с отдельной статьей

    globalFeed/ -> Главная страница
      components/ -> компоненты исп. только внутри конкретной страницы

    authentication/
      components/ -> компоненты исп. только внутри конкретной страницы
        BackendErrorMessages - Компонент для вывода ошибок при отправке данных на сервер

  /components -> (shareable) общие, переиспользуемые компоненты, которые исп. на разных страницах
    CurrentUserChecker - Компонент для (входа) через Token Пользователя
    TopBar - Компонент для отображения Навигации в зависимости от зарегистрирован ли Пользователь
    Feed - Компонент выводящий список статей
    Pagination - Компонент пагинации страниц
    PopularTags - Компонент для вывода тегов

  /hooks -> кастомные хуки
    useFetch - собственный HOOK - для отправка axios запроса
    useLocalStorage - собственный HOOK - для чтения и записи в localStorage

  /context -> React Контекст - замена Redux
    correntUser - для хранения данных пользователя

  routes.js -> хранилище роутеров
*/

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <TopBar />
        <Routes />
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
)
