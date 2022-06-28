import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
// import { SearchContext } from '../App';


// import pizzas from './assets/pizzas.json';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  
  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  
  // https://62adb789645d00a28afe6622.mockapi.io/items

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }
  
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  }

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);


  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0,0);

    if(!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  const pizzas = items.filter(obj => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase());
  }).map((obj) => <PizzaBlock key={obj.id} {...obj}/>);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error' ? (
            <div className="content__error-info">
              <h2>Произошла ошибка 😕</h2>
              <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div>
          ) : (
            <div className="content__items">
              {status === 'loading' ? skeletons : pizzas }
            </div>
          )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
