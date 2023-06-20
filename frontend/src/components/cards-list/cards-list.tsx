import {Product, Products} from '../../types/types';
import {CardsItem} from '../cards-item/cards-item';

type CardsListProps = {
  products: Products
};

export function CardsList(props: CardsListProps): JSX.Element {
  const {products} = props;
  return (
    <ul className="catalog-cards__list">
      {products.map((product: Product, index) => (
        <CardsItem
          product={product} index={index}
        />))}
    </ul>
  );
}
