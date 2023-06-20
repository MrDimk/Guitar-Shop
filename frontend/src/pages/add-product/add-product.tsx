import {Link, useNavigate} from 'react-router-dom';
import {Paths} from '../../const';
import {FormEvent, useRef} from 'react';
import {useAppDispatch} from '../../hooks';

export function AddProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const articleRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const stringCountRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (
      titleRef.current !== null &&
      dateRef.current !== null &&
      articleRef.current !== null &&
      typeRef.current !== null &&
      stringCountRef.current !== null &&
      descriptionRef.current !== null
    ) {
      const productData = {
        name: titleRef.current.value,
        date: dateRef.current.value,
        article: articleRef.current.value,
        type: typeRef.current.value,
        stringCount: stringCountRef.current.value,
        description: descriptionRef.current.value,
      };

      // dispatch(addProduct(productData));

      // Reset form fields
      titleRef.current.value = '';
      dateRef.current.value = '';
      articleRef.current.value = '';
      typeRef.current.value = '';
      stringCountRef.current.value = '';
      descriptionRef.current.value = '';
    }
  };

  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item"><Link className="link" to={Paths.Login}>Вход</Link></li>
          <li className="breadcrumbs__item"><Link className="link" to={Paths.Products}>Товары</Link></li>
          <li className="breadcrumbs__item"><a className="link">Новый товар</a></li>
        </ul>
        <form className="add-item__form" action="" method="get" onSubmit={handleSubmit}>
          <div className="add-item__form-left">
            <div className="edit-item-image add-item__form-image">
              <div className="edit-item-image__image-wrap"></div>
              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn">Добавить</button>
                <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
              </div>
            </div>
            <div className="input-radio add-item__form-radio">
              <span>Выберите тип товара</span>
              <input type="radio" id="guitar" name="item-type" value="guitar" ref={typeRef} defaultChecked />
              <label htmlFor="guitar">Акустическая гитара</label>
              <input type="radio" id="el-guitar" name="item-type" value="el-guitar" ref={typeRef} />
              <label htmlFor="el-guitar">Электрогитара</label>
              <input type="radio" id="ukulele" name="item-type" value="ukulele" ref={typeRef} />
              <label htmlFor="ukulele">Укулеле</label>
            </div>
            <div className="input-radio add-item__form-radio">
              <span>Количество струн</span>
              <input type="radio" id="string-qty-4" name="string-qty" value="4" ref={stringCountRef} defaultChecked />
              <label htmlFor="string-qty-4">4</label>
              <input type="radio" id="string-qty-6" name="string-qty" value="6" ref={stringCountRef} />
              <label htmlFor="string-qty-6">6</label>
              <input type="radio" id="string-qty-7" name="string-qty" value="7" ref={stringCountRef} />
              <label htmlFor="string-qty-7">7</label>
              <input type="radio" id="string-qty-12" name="string-qty" value="12" ref={stringCountRef} />
              <label htmlFor="string-qty-12">12</label>
            </div>
          </div>
          <div className="add-item__form-right">
            <div className="custom-input add-item__form-input">
              <label>
                <span>Дата добавления товара</span>
                <input type="text" name="date" defaultValue="" placeholder="Дата в формате 00.00.0000" ref={dateRef} />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label>
                <span>Введите наименование товара</span>
                <input type="text" name="title" defaultValue="" placeholder="Наименование" ref={titleRef} />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label>
                <span>Введите цену товара</span>
                <input type="text" name="price" defaultValue="" placeholder="Цена в формате 00 000" ref={priceRef} />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label>
                <span>Введите артикул товара</span>
                <input type="text" name="sku" defaultValue="" placeholder="Артикул товара" ref={articleRef}/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea add-item__form-textarea">
              <label>
                <span>Введите описание товара</span>
                <textarea name="description" placeholder="" ref={descriptionRef}></textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="add-item__form-buttons-wrap">
            <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
            <button className="button button--small add-item__form-button" type="button" onClick={()=>navigate(Paths.Products)}>Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
