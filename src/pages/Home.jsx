import React from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';


// import pizzas from './assets/pizzas.json';

function Home () {
  // https://62adb789645d00a28afe6622.mockapi.io/items

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setcategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://62adb789645d00a28afe6622.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
    .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      })      
      .catch((err) => {alert('Ошибка при получении данных')});
      window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setcategoryId(i)}/>
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
      </div>
        <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
          {isLoading
            ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}

export default Home;