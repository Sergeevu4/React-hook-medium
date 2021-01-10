import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useLocalStorage } from './useLocalStorage'

const BASE_URL = 'https://conduit.productionready.io/api'
// ! Пока не работает сервер
// const BASE_URL = 'http://localhost:3000/api'

// * Собственный HOOK - для отправка axios запроса
export const useFetch = (url) => {
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // # Необходим для передачи настроек, опций  в axios при исп. хука, снаружи
  // пример { method: 'post', data: { отправка чего-либо } }
  const [options, setOptions] = useState({})

  // # Собственный HOOK - для чтения и записи в localStorage
  const [token] = useLocalStorage('token') // key -> token

  // При каждом ререндаре каждая функция создания компонента всегда новая,
  // если исп. doFetch за компоненте
  // и указать ее в зависимостях в useEffect
  // произодет рекурсия - переполнение стека

  // ! Если исп. собственный hook и в нем создается функция
  // которая будет потом исп. снаружи, ее необходимо
  // обернуть в useCallback для меморизации (кеширования)
  // ! НО если внутри собственного hook передается функция
  // сеттер из useState - то ее оборачивать не нужно

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    // Отправляем запрос
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      return
    }

    // # Добавления Токена к любому запросу
    const requestOptions = {
      ...options,
      headers: {
        authorization: token ? `Token ${token}` : '',
      },
    }

    // axios(BASE_URL + url, options)
    axios(BASE_URL + url, requestOptions)
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        console.error(err)

        setError(err.response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [url, isLoading, options, token])

  // До того как будет вызвана функция doFetch, запрос не будет отправлен
  return [{ response, isLoading, error }, doFetch]
}
