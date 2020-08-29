import React from 'react'
import { Link } from 'react-router-dom'

// * Компонент выводящий список статей
function Feed({ articles }) {
  console.log('Feed', articles)

  return (
    <div>
      {articles.map((article, index) => (
        <div className='article-preview' key={index}>
          <div className='article-meta'>
            {/* Ссылка (Картинка) на страницу Автора */}
            <Link to={`/profiles/${article.author.username}`}>
              <img src={`${article.author.image}`} alt='' />
            </Link>

            <div className='info'>
              {/* Ссылка на страницу Автора */}
              <Link
                to={`/profiles/${article.author.username}`}
                className='author'
              >
                {article.author.username}
              </Link>

              {/* Когда статья была опубликована */}
              <span className='date'>{article.createdAt}</span>
            </div>
          </div>

          {/* Информация о самой статье */}
          <Link to={`/profiles/${article.slug}`} className='preview-link'>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <span>Read more...</span>

            {/* Список тегов Массив строк */}
            <ul className='tag-list'>
              {article.tagList.map((tag) => (
                <li key={tag} className='tag-default tag-pill tag-outline'>
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Feed
