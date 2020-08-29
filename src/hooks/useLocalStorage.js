import { useState, useEffect } from 'react'

// * Собственный HOOK - для чтения и записи в localStorage
// Второй не обязательный аргумент, initialValue - значение по умолчанию
export const useLocalStorage = (key, initialValue = '') => {
  // # Исп. ленивая инициализация в useState
  // value - то значение которого храниться по переданному key в localStorage
  const [value, setValue] = useState(() => {
    // Если необходимого ключа в localStorage, не оказалось
    // возврат значения по умолчанию
    return localStorage.getItem(key) || initialValue
  })

  // # Для обновления состояния в localStorage из компонента
  // Если изменили value, обновляем localStorage
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  // # Возвращаем то, значение полученое из localStorage
  // и функцию которая обновляет значение в localStorage
  return [value, setValue]
}
