import React from 'react'
import { range } from 'utils'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

// * Компонент пагинации страниц
// total - общие количество статей на сайте
// limit - необходимое количество элементов для рендаринга
// url - базовая ссылка к которая отвечает куда будет вести страница
// currentPage - текущая, активная страница
function Pagination({ total, limit, url, currentPage }) {
  // Количество страниц
  const pageCount = Math.ceil(total / limit)
  // Сгенерированный пронумерованный массив
  const pages = range(1, pageCount)

  return (
    <ul className='pagination'>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          url={url}
        />
      ))}
    </ul>
  )
}

function PaginationItem({ page, url, currentPage }) {
  const liClasses = classNames('page-item', {
    active: currentPage === page,
  })

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className='page-link'>
        {page}
      </Link>
    </li>
  )
}

export default Pagination
