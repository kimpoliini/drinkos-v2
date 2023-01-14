import React, { FC } from 'react';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import Search from './components/Search';


const App: FC = () => {
  return (
    <div className='app-wrapper'>
      <div className="App">
        <header>
          <Link to={'/'}><h1>Drinkos</h1></Link>
          <nav>
            <Link to={'/'}>Link one</Link>
            <Link to={'/'}>Link two</Link>
            <Link to={'/'}>Link three</Link>

            
            <Search />
          </nav>
        </header>
        {/* <hr /> */}

        <main>
          <Outlet />
        </main>
      </div>

      <footer>
        <div>
          <span>Contact</span>
          <br />
          <span>About</span>
          <br />
          <span>Suggest a change</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
