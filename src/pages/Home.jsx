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

  React.useEffect(() => {
    fetch('https://62adb789645d00a28afe6622.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
        <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
          {isLoading
            ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  )
}

export default Home;