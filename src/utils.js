// https://www.npmjs.com/package/query-string
import { parse } from 'query-string'

// * Функция для генерации списка
export const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}

// *  Количество элементов
export const limit = 10

// * Функция для получения выбранной страницы и курса данных с севрера
// react-router-dom -> location -> location.search
export const getPaginator = (search) => {
  // search: "?page=4"
  const parsedSeach = parse(search)
  // Выбранная страница или первая
  const currentPage = parsedSeach.page ? Number(parsedSeach.page) : 1 // 1- первая стр.

  // offset - параметр url который отдает необходимый кусок данных, он считается с 0, озн. первая ст.
  // `/articles?limit=10&offset=0`
  const offset = currentPage * 10 - limit // currentPage ~ 3 = 3 * 10 - 10

  return { currentPage, offset }
}
