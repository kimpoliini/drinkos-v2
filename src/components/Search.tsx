import React, { FC, useEffect, useRef, useState } from 'react'
import './search.css'
import { ReactImageTint } from 'react-image-tint';
import { IDrinkListItem } from './DrinkListItem';
import { baseUrl, getDrinksFromUrl } from '../config/api';
import { apiKey } from '../config/apiKey';

const Search: FC = () => {

  const [drinks, setDrinks] = useState<IDrinkListItem[]>([])
  const [showResults, setShowResults] = useState<boolean>(true)
  const [hasQuery, setHasQuery] = useState<boolean>(false)
  const elementRefs = useRef<{ app: Element; searchResults: Element }>()

  useEffect(() => {
    let app = document.querySelector(".App")
    let searchResults = document.querySelector(".search-results")

    window.addEventListener("resize", () => {
      updateResultsPosition()
    })

    elementRefs.current = { app: app!, searchResults: searchResults! }
  }, [])

  const updateResultsPosition = () => {
    let width = window.innerWidth

    let left = window.getComputedStyle(elementRefs.current!.app).marginLeft
    let right = window.getComputedStyle(elementRefs.current!.app).marginRight

    if (width >= 768) { //Tablet and bigger
      elementRefs.current!.searchResults.setAttribute("style", `right: ${right}`)
    } else if (width >= 500 && width < 768) { //Between tablet and Mobile
      elementRefs.current!.searchResults.setAttribute("style", `left: ${left}; right: ${right}`)
    } else if (width < 500) { //Mobile
      elementRefs.current!.searchResults.removeAttribute("style")
    }
  }

  const renderSearchResults = (arr: IDrinkListItem[]) => {
    let results = drinks.map((e: IDrinkListItem, i) => {
      return <p key={i}>{e.name}</p>
    })

    return results
  }

  return (
    <div tabIndex={0}
      onBlur={(e) => {
        //Makes search results disappear when pressing outside the search area
        if (e.relatedTarget?.nodeName !== "DIV") setShowResults(false)
      }}>
      <div className='search-bar'>
        <input placeholder='Search drinks...'
          onFocus={() => setShowResults(true)}
          onChange={(e) => {
            let query = e.target.value
            if (query.length >= 3) {
              updateResultsPosition()

              let url = `${baseUrl + apiKey}/search.php?s=${query}`
              getDrinksFromUrl(url).then(drinks => {
                setDrinks(drinks)
                setHasQuery(true)
              })
            } else {
              setHasQuery(false)
              setDrinks([])
            }
          }} />
        <div>
          <ReactImageTint src={require('../assets/icons/search.png')} color="#a8b0c0" />
        </div>
      </div>
      <div className={"search-results " + (showResults ? "" : "hidden")}>
        {drinks.length > 0 ? renderSearchResults(drinks)
          : (hasQuery ? <p>No results</p> : null)}
      </div>
    </div>

  )
}

export default Search