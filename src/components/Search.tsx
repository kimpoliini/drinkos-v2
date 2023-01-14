import React, { FC, useEffect, useState } from 'react'
import './search.css'
import { ReactImageTint } from 'react-image-tint';
import { IDrinkListItem } from './DrinkListItem';
import { baseUrl, getDrinksFromUrl } from '../config/api';
import { apiKey } from '../config/apiKey';

const Search: FC = () => {

  const [drinks, setDrinks] = useState<IDrinkListItem[]>([])

  useEffect(() => {
    let app = document.querySelector(".App")
    let searchResults = document.querySelector(".search-results")
    
    window.addEventListener("resize", (e) => {
      let width = window.innerWidth

      let left = window.getComputedStyle(app!).marginLeft
      let right = window.getComputedStyle(app!).marginRight


      if (width >= 768) { //Tablet and bigger
        searchResults!.setAttribute("style", `right: ${right}`)
      } else if (width >= 500 && width < 768) { //Between tablet and Mobile
        searchResults!.setAttribute("style", `left: ${left}; right: ${right}`)
      } else if (width < 500) { //Mobile
        searchResults!.removeAttribute("style")
      }
    })

  }, [])

  return (
    <div>
      <div className='search-bar'>
        <input placeholder='Search drinks...'
          onChange={(e) => {
            let query = e.target.value
            if (query.length >= 3) {
              let url = `${baseUrl + apiKey}/search.php?s=${query}`
              getDrinksFromUrl(url).then(drinks => {
                setDrinks(drinks)
              })
            }

          }} />
        <div
          onClick={() => { console.log("search") }}>

          <ReactImageTint src={require('../assets/icons/search.png')} color="#a8b0c0" />
        </div>
      </div>
      <div className="search-results">
        {drinks ? (drinks.map((e: IDrinkListItem, i) => {
          return <p key={i}>{e.name}</p>
        })) : null}
      </div>
    </div>

  )
}

export default Search