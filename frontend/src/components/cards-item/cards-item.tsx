import {Product} from '../../types/types';
import {formatPrice} from '../../utils/utils';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {Paths} from '../../const';

type CardsItemProps = {
  product: Product,
  index: number
};

export function CardsItem({product, index}: CardsItemProps): JSX.Element {

  const price = formatPrice(product.price);
  const date = dayjs(product.addedDate).format('DD.MM.YYYY')

  const deleteProductButtonHandler = () => {
    console.log('delete product: ', product.id);
  };

  return (
    <li className="catalog-item" key={`${index+product.id}`}>
      <div className="catalog-item__data">
        <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`/product/${product.id}`}>
            <p className="catalog-item__data-title">{product.title}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">Дата добавления {date}</p>
          <p className="catalog-item__data-price">{price}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to={`/product/update/${product.id}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={deleteProductButtonHandler}>Удалить</button>
      </div>
    </li>
  );
}
