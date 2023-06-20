import {ChangeEvent, useState} from 'react';
import {Filters} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFilter} from '../../store/actions';
import {fetchProductsAction} from '../../store/api-actions';

export function Filter(): JSX.Element {

  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const initialFilters = {
    acoustic: false,
    electric: false,
    ukulele: false,
    strings4: false,
    strings6: false,
    strings7: false,
    strings12: false,
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log(filters);
    dispatch(changeFilter({...filters, [name]: checked}));
  };

  const handleResetFiltersButton = () => {
    dispatch(changeFilter(initialFilters));
    dispatch(fetchProductsAction());
  }

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={filters.acoustic}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={filters.electric}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={filters.ukulele}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="strings4"
            checked={filters['strings4']}
            onChange={handleCheckboxChange}
            disabled={filters.acoustic || filters.electric}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="strings6"
            checked={filters['strings6']}
            onChange={handleCheckboxChange}
            disabled={filters.ukulele}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="strings7"
            checked={filters['strings7']}
            onChange={handleCheckboxChange}
            disabled={filters.ukulele}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="strings12"
            checked={filters['strings12']}
            disabled={filters.electric || filters.ukulele}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleResetFiltersButton}>Очистить</button>
    </form>
  );
}
