import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changePage} from '../../store/actions';

type PaginationProps = {
  pages: number;
  // currentPage: number;
};

export function Pagination({ pages }: PaginationProps) {
  const currentPage = useAppSelector((state) => state.currentPage)
  const dispatch = useAppDispatch();

  const onPageChange = (page: number) => {
    dispatch(changePage(page))
  };

  function getPaginationItems() {
    const paginationButtons = [];
    const visiblePageCount = 3;
    const pageOffset = 1;

    // Вычисление начального и конечного индексов видимых страниц
    let startPage = Math.max(currentPage - pageOffset, 1);
    let endPage = Math.min(startPage + visiblePageCount - 1, pages);

    // Проверка и корректировка начального и конечного индексов
    if (endPage - startPage + 1 < visiblePageCount) {
      startPage = Math.max(endPage - visiblePageCount + 1, 1);
    }

    // Добавление кнопки "Назад" (если нужно)
    if (startPage > 1) {
      paginationButtons.push(
        <li key="page-prev" className="pagination__page pagination__page--prev">
          <Link className="link pagination__page-link" to="#" onClick={()=>{onPageChange(currentPage-1)}}>
            Назад
          </Link>
        </li>
      );
    }

    // Добавление ссылок на страницы
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <li
          key={`page-${i}`}
          className={`pagination__page ${i === currentPage ? 'pagination__page--active' : ''}`}
        >
          <Link className="link pagination__page-link" to="#" onClick={()=>{onPageChange(i)}}>
            {i}
          </Link>
        </li>
      );
    }

    // Добавление кнопки "Далее" (если нужно)
    if (endPage < pages) {
      paginationButtons.push(
        <li key="page-next" className="pagination__page pagination__page--prev">
          <Link className="link pagination__page-link" to="#" onClick={()=>{onPageChange(currentPage+1)}}>
            Далее
          </Link>
        </li>
      );
    }

    return paginationButtons;
  }

  return <ul className="pagination__list">{getPaginationItems()}</ul>;
}
