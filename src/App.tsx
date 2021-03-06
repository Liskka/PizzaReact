import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

// export const SearchContext = React.createContext();

function App() {
  // const [searchValue, setSearchValue] = React.useState('');

  return (
    // {<div className="wrapper">
    //   {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
    //   <Header />
    //   <div className="content">}
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    //   </div>
    //   {/* </SearchContext.Provider> */}
    // </div>
  );
}

export default App;
