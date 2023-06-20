import {CardsList} from '../../components/cards-list/cards-list';
import {Link, useNavigate} from 'react-router-dom';
import {Pagination} from '../../components/pagination/pagination';
import {Paths} from '../../const';
import {Filter} from '../../components/filter/filter';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchProductsAction} from '../../store/api-actions';

export function ProductList(): JSX.Element {
  const navigate = useNavigate();
  const {products, pages} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const addNewProductButtonHandler = () => {
    navigate(Paths.NewProduct);
  };

  const filterChangeHandler = (state: { [key: string]: boolean }) => {
    console.log(state);
    dispatch(fetchProductsAction());
  };

  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Вход</Link>
          </li>
          <li className="breadcrumbs__item">
            <a className="link">Товары</a>
          </li>
        </ul>
        <div className="catalog">
          <Filter />
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
              <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
            </div>
            <div className="catalog-sort__order">
              <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
              <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
            </div>
          </div>
          <div className="catalog-cards">
            <CardsList products={products} />
          </div>
        </div>
        <button className="button product-list__button button--red button--big" onClick={addNewProductButtonHandler}>Добавить новый товар</button>
        <div className="pagination product-list__pagination">
          <Pagination pages={pages} />
        </div>
      </div>
    </section>
  );
}
