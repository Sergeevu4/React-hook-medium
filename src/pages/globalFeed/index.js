import React, { useEffect } from 'react'
import { useFetch } from 'hooks/useFetch'
import { stringify } from 'query-string'
import { getPaginator, limit } from 'utils'
import Feed from 'components/Feed'
import Pagination from 'components/Pagination'
import PopularTags from 'components/PopularTags'
import Loading from 'components/Loading'
import ErrorMessage from 'components/ErrorMessage'

// * Главная страница
function GlobalFeed({ location, match }) {
  const { offset, currentPage } = getPaginator(location.search)
  // Получение строки: `/articles?limit=10&offset=0` - первая стр.
  // Аналог new URLSearchParams({ limit, offset }).toString()
  const stringifiedParams = stringify({
    limit,
    offset,
  })

  const apiUrl = `/articles?${stringifiedParams}`

  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  // При инициализации
  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1>Medium Clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>

      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            {isLoading && <Loading />}

            {/* Если загрузки нет и ответ получен  */}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />

                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={match.url}
                  currentPage={currentPage}
                />
              </>
            )}

            {error && <ErrorMessage />}
          </div>

          <PopularTags />
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed

// articlesCount - из сервера количество всех статей на сайте вообще
// limit - необходимое количество элементов для рендаринга
// url - базовая ссылка к которая отвечает куда будет вести страница
// currentPage - текущая, активная страница
