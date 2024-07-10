import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import { ScrollContext } from './config/ScrollContext';
import { SearchBar } from './components';

const App: FC = () => {
  const [value, setValue] = useState<number>(0)
  const menuButton = useRef<HTMLDivElement>(null)
  const [isMenuHidden, setIsMenuHidden] = useState<boolean>(true)
  const location = useLocation();

  //Hide menu button if it's open when the URL changes
  useEffect(() => {
    if (!isMenuHidden) {
      menuButton.current?.classList.toggle("menu-hidden")
      setIsMenuHidden(true)
    }
  }, [location])

  return (
    <div className='app-wrapper'>
      <div className="App">
        <header>
          <Link to={'/'}><h1>Drinkos</h1></Link>
          <nav>
            <span onClick={() => {
              menuButton.current?.classList.toggle("menu-hidden")
              setIsMenuHidden(menuButton.current?.classList.contains("menu-hidden")!)
            }}
              className="material-icons menu-button">
              {isMenuHidden ? "menu" : "close"}
            </span>
            <div className='header-links'>
              <Link to={'/'}>Home</Link>
              <Link to={'/latest'}>Latest</Link>
              <Link to={'/browse'}>Browse</Link>
              <Link to={'/randomdrink'}>Random drink</Link>
            </div>

            <SearchBar />
            <div ref={menuButton} className='menu-links menu-hidden'>
              <Link to={'/'}>Home</Link>
              <Link to={'/latest'}>Latest</Link>
              <Link to={'/browse'}>Browse</Link>
              <Link to={'/randomdrink'}>Random drink</Link>
            </div>
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

          <p>Results provided by <a href="https://www.thecocktaildb.com/" rel='nofollow'>TheCocktailDB</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
