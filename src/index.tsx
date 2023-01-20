import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import DrinkInfo from './pages/DrinkInfo';
import Contact from './pages/Contact';
import Latest from './pages/Latest';
import Search from './pages/Search';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/drink/:id",
        element: <DrinkInfo />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/latest/",
        element: <Latest />,
      },
      {
        path: "/search/",
        element: <Search />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
