import React, { createContext, useState } from 'react'

// Для хранения данных пользователя, который залогинен.
// Чтобы каждый компонент мог иметь к ним доступ
export const CurrentUserContext = createContext([{}, () => {}])

// Выступает в роли хранения и передачи данных среди компонентов, что-то типо Redux
export const CurrentUserProvider = ({ children }) => {
  const [state, setState] = useState({
    // Загружаем Пользователя
    isLoading: false,
    // Залогинен ли Пользователь: null, true, false
    isLoggenIn: null,
    // Данные которые мы получили с сервера
    currentUser: null,
  })

  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  )
}
