import { useEffect, useContext } from 'react'
import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CurrentUserContext } from 'contexts/correntUser'

/*
  Вся информация которую храним, сохранем в React context
  при перезагрузки, исчезает

  По токену который мы сохраняем в localStorage
  необходимо отправлять запрос с currentUser

  Каждый раз когда приложения монтируется
  зафечить Юзера
*/

// * Компонент для (входа) через Token Пользователя
function CurrentUserChecker({ children }) {
  // # Собственный HOOK - для отправка axios запроса
  const [{ response }, doFetch] = useFetch('/user')

  // # Собственный HOOK - для чтения и записи в localStorage
  const [token] = useLocalStorage('token') // key -> token

  // # Хранилище данный из React Context и функция для его изменения
  const [, setCurrentUserState] = useContext(CurrentUserContext)

  useEffect(() => {
    if (!token) {
      // # Токена нет
      setCurrentUserState((prevState) => ({
        ...prevState,
        isLoggenIn: false,
      }))

      return
    }

    doFetch()

    // # Происходит загрузка данных (наступит до doFetch)
    setCurrentUserState((prevState) => ({
      ...prevState,
      isLoading: true,
    }))
  }, [token, doFetch, setCurrentUserState])

  // # Эффект который следит за ответом от сервера (после doFetch)
  useEffect(() => {
    if (!response) {
      return
    }

    // # Обновляю хранилище с данными
    setCurrentUserState((prevState) => ({
      ...prevState,
      isLoggenIn: true,
      isLoading: false,
      currentUser: response.user,
    }))
  }, [response, setCurrentUserState])

  return children
}

export default CurrentUserChecker
