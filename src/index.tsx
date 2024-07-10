import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { QueryClientProvider,QueryClient } from 'react-query';
import Home from './pages/Home';
import DrinkInfo from './pages/DrinkInfo';
import Latest from './pages/Latest';
import Search from './pages/Search';
import Browse from './pages/Browse';
import BrowseContent from './pages/BrowseContent';
import About from './pages/footer/About';
import Contact from './pages/footer/Contact';
import SuggestChange from './pages/footer/SuggestChange';
import RandomDrink from './pages/footer/RandomDrink';

const client = new QueryClient()

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
      {
        path: "/browse/",
        element: <Browse />,
      },
      {
        path: "/browse/:type/:subtype",
        element: <BrowseContent />,
      },
      {
        path: "/about/",
        element: <About />,
      },
      {
        path: "/contact/",
        element: <Contact />,
      },
      {
        path: "/suggestchange/",
        element: <SuggestChange />,
      },
      {
        path: "/randomdrink/",
        element: <RandomDrink />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
