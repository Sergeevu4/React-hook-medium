import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/correntUser'
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTExNDI0LCJ1c2VybmFtZSI6IlRRWlRwNEw1Tm5LVSIsImV4cCI6MTYwMzQ2NDQwNn0.1-qPiOa9pVVzVkXrMNGUIDxxP_xwjbxN8qVxeLvCL4k

// ejiqpep@gmail.com
// koloda007

// * Компонент для отображения Header навигации в зависимости от зарегистрирован ли Пользователь
function TopBar() {
  // # Хранилище данный из React Context и функция для его изменения
  const [currentUserState] = useContext(CurrentUserContext)

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Medium
        </Link>

        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <NavLink exact to='/' className='nav-link'>
              Home
            </NavLink>
          </li>

          {/* !Отображения ссылок только если Пользователь не зарегистрирован */}
          {!currentUserState.isLoggenIn && (
            <>
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link'>
                  Sign in
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink to='/register' className='nav-link'>
                  Sign up
                </NavLink>
              </li>
            </>
          )}

          {currentUserState.isLoggenIn && (
            <>
              <li className='nav-item'>
                {/* Создать новую статью */}
                <NavLink to='/article/new' className='nav-link'>
                  <i className='ion-compose'></i>
                  &nbsp; New Post
                </NavLink>
              </li>

              <li className='nav-item'>
                {/* Текущий профиль юзера */}

                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className='nav-link'
                >
                  <img src={`${currentUserState.currentUser.img}`} alt='' />
                  &nbsp; {`${currentUserState.currentUser.username}`}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default TopBar
