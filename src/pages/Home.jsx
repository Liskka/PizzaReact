import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';


// import pizzas from './assets/pizzas.json';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  
  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  
  // https://62adb789645d00a28afe6622.mockapi.io/items

  const {searchValue} = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }
  
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    axios
      .get(`https://62adb789645d00a28afe6622.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    ).then(res => {
      setItems(res.data);
      setIsLoading(false);
    })

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
      fetchPizzas();
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
      <div className="content__items">
        {isLoading
          ? skeletons
          : pizzas }
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
