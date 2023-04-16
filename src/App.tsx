import React, { FC, useState } from 'react';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import SearchBar from './components/SearchBar';
import { ScrollContext } from './config/ScrollContext';

const App: FC = () => {
  const [value, setValue] = useState<number>(0)

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
          <ScrollContext.Provider value={{ value, setValue }}>
            <Outlet />
          </ScrollContext.Provider>
        </main>
      </div>

      <footer>
        <div>
          <Link to={'/about'}>About</Link>
          <Link to={'/contact'}>Contact</Link>
          <Link to={'/suggestchange'}>Suggest a change</Link>

          <p>Take me to a <Link to={'/randomdrink'}>random drink</Link></p>
          <p>Results provided by <a href="https://www.thecocktaildb.com/" rel='nofollow'>TheCocktailDB</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
