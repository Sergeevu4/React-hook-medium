import React from 'react'

// * Компонент для вывода ошибок при отправке данных на сервер
function BackendErrorMessages({ backendErrors }) {
  // # (backendErrors) Полученные ошибки от backend (axios)
  // {email:[nameError], password: [nameError], username: [nameError]}

  const errorMessages = Object.keys(backendErrors).map((key) => {
    const message = backendErrors[key].join(' ')
    return `${key} ${message}`
  })

  return (
    <ul className='error-messages'>
      {errorMessages.map((errorMessage) => (
        <li key={errorMessage}>{errorMessage}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages
