import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const {id} = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://62adb789645d00a28afe6622.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if(!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} грн</h3>
      <img src={pizza.imageUrl}/>
    </div>
  )
}

export default FullPizza;