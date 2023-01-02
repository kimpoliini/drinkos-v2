import React, { FC } from 'react';
import './App.css';
import { Outlet, Link } from "react-router-dom";


const App: FC = () => {
  return (
    <div className="App">
      <header>
        <Link to={'/'}><h1>Drinkos</h1></Link>
        <nav>
          <Link to={'/'}>Link one</Link>
          <Link to={'/'}>Link two</Link>
          <Link to={'/contact/'}>Contact</Link>
        </nav>
      </header>
      <hr />

      <main>
        <Outlet />
      </main>

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
