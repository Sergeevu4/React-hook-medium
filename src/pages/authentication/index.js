import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { CurrentUserContext } from 'contexts/correntUser'
import BackendErrorMessages from './components/BackendErrorMessages'

// * Общий компонент для Входа(Sign In) и Регистрация(Sign Up)
function Authentication({ match }) {
  // # Определение на какой странице находимся
  const isLogin = match.path === '/login'
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const apiUrl = isLogin ? '/users/login' : '/users'

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // # Состояние успешного входа
  const [isSuccessFillSubmit, setIsSuccessFillSubmit] = useState(false)

  // # Собственный HOOK - для отправка axios запроса
  // в зависимости от того какая страница открыта, react-router
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  // # Собственный HOOK - для чтения и записи в localStorage
  const [, setToken] = useLocalStorage('token') // key -> token

  // # Хранилище данный из React Context и функция для его изменения
  const [, setCurrentUserState] = useContext(CurrentUserContext)

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const onChangePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const onChangeUserName = (evt) => {
    setUserName(evt.target.value)
  }

  // # Отправка данный на сервер
  const onFormSubmit = (evt) => {
    evt.preventDefault()

    // # Отправка данных в зависимости от страницы
    const user = isLogin ? { email, password } : { username, email, password }
    console.log('Authentication name', user)

    // # передаваемые options для axios
    doFetch({
      method: 'post',
      data: {
        user,
      },
    })
  }

  // # После того произошла отправка данных для Регистрации (Sign Up)
  // в ответ от сервера получаем в response token
  // и его необходимо сохранить в localStorage.
  // Или произошел вход под своими данными(Sign In) - через сох. токен
  useEffect(() => {
    // При первой инициализации, response === null
    // В этом случае никаких действий выполнять не нужно
    if (!response) {
      return
    }

    console.log('token', response.user.token)

    // # После регистрации
    setToken(response.user.token)

    // # Обновляю хранилище с данными
    setCurrentUserState((prevState) => ({
      ...prevState,
      isLoggenIn: true,
      isLoading: false,
      currentUser: response.user, // данные с сервера
    }))

    // # После входа перенаправь на главную страницу
    setIsSuccessFillSubmit(true)
  }, [response, setToken, setCurrentUserState])

  // # Если произошел успешный вход
  if (isSuccessFillSubmit) {
    // переход на главную страницу
    return <Redirect to='/' />
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>{pageTitle}</h1>

            <p className='text-xs-center'>
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>

            <form onSubmit={onFormSubmit}>
              {/* Вывод ошибок */}
              {error && <BackendErrorMessages backendErrors={error.errors} />}

              <fieldset>
                {/* В зависимости от нахождения страницы, вывод username*/}
                {!isLogin && (
                  <fieldset className='form-group'>
                    <input
                      type='text'
                      className='form-control from-control-lg'
                      placeholder='User Name'
                      value={username}
                      onChange={onChangeUserName}
                    />
                  </fieldset>
                )}

                <fieldset className='form-group'>
                  <input
                    type='email'
                    className='form-control from-control-lg'
                    placeholder='Email'
                    value={email}
                    onChange={onChangeEmail}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    type='password'
                    className='form-control from-control-lg'
                    placeholder='Password'
                    value={password}
                    onChange={onChangePassword}
                  />
                </fieldset>

                <button
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'
                  // # Кнопка отключена пока форма отправляется
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
