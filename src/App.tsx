import React, { FC } from 'react';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import SearchBar from './components/SearchBar';

const App: FC = () => {
  return (
    <div className='app-wrapper'>
      <div className="App">
        <header>
          <Link to={'/'}><h1>Drinkos</h1></Link>
          <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/latest'}>Latest</Link>
            <Link to={'/browse'}>Browse</Link>

            <SearchBar />
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

      <footer>
        <div>
          <p>About</p>
          <p>Contact</p>
          <p>Suggest a change</p>
          <p>Results provided by <a href="https://www.thecocktaildb.com/">TheCocktailDB</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
