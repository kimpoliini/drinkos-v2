import React, { FC, useEffect, useRef, useState } from 'react'
import './searchBar.css'
import { ReactImageTint } from 'react-image-tint';
import { IDrinkListItem } from './DrinkListItem';
import { baseUrl, getDrinksFromUrl } from '../config/api';
import { apiKey } from '../config/apiKey';
import { Link, useParams } from 'react-router-dom';

const SearchBar: FC = () => {

  const [drinks, setDrinks] = useState<IDrinkListItem[]>([])
  const [showResults, setShowResults] = useState<boolean>(true)
  // const [hasQuery, setHasQuery] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const elementRefs = useRef<{ app: Element; searchResults: Element }>()
  let { id } = useParams()

  useEffect(() => {
    let app = document.querySelector(".App")
    let searchResults = document.querySelector(".search-results")

    window.addEventListener("resize", () => {
      updateResultsPosition()
    })

    elementRefs.current = { app: app!, searchResults: searchResults! }
  }, [])

  useEffect(() => {
    setShowResults(false)
  }, [id])

  const updateResultsPosition = () => {
    let width = window.innerWidth

    let left = window.getComputedStyle(elementRefs.current!.app).marginLeft
    let right = window.getComputedStyle(elementRefs.current!.app).marginRight

    if (width >= 768) { //Tablet and bigger
      elementRefs.current!.searchResults
        .setAttribute("style", `right: ${right}`)

    } else if (width >= 500 && width < 768) { //Between tablet and Mobile
      elementRefs.current!.searchResults
        .setAttribute("style", `left: ${left}; right: ${right}`)

    } else if (width < 500) { //Mobile
      elementRefs.current!.searchResults
        .removeAttribute("style")
    }
  }

  const renderSearchResults = () => {
    let arr = [...drinks]
    let showMore = false

    if (arr.length > 8) {
      showMore = true
      arr.length = 8
    }

    let results = arr.map((e: IDrinkListItem, i) => {
      return (
        <Link to={`/drink/${e.id}`} key={i} className="search-result-item">
          <p>{e.name}</p>
        </Link>
      )
    })

    if (showMore) {
      results.push(
        <Link to={`/search?q=${query}`} key={arr.length + 1} className="search-result-item">
          <p style={{ textAlign: "center" }}>Show all {drinks.length} results</p>
        </Link>
      )
    }

    return results
  }

  return (
    <div tabIndex={0}
      onBlur={(e) => {
        //Makes search results disappear when pressing outside the search area
        if (e.relatedTarget?.nodeName !== "DIV" &&
          e.relatedTarget?.getAttribute("class") !== "search-result-item") {
          setShowResults(false)
        }
      }}>
      <div className='search-bar'>
        <input placeholder='Search drinks...'
          onFocus={() => setShowResults(true)}
          onChange={(e) => {
            let newQuery = e.target.value
            if (newQuery.trim().length >= 3) {
              updateResultsPosition()

              let url = `${baseUrl + apiKey}/search.php?s=${newQuery.trimStart()}`
              getDrinksFromUrl(url).then(drinks => {
                setDrinks(drinks)
                setQuery(newQuery)
              })
            } else {
              setQuery("")
              setDrinks([])
            }
          }} />
        <div>
          <Link to={`/search?q=${query}`}>
            <ReactImageTint src={require('../assets/icons/search.png')} color="#a8b0c0" />
          </Link>
        </div>
      </div>
      <div className={"search-results " + (showResults ? "" : "hidden")}>
        {drinks.length > 0 ? renderSearchResults()
          : (query !== "" ? <p>No results</p> : null)}
      </div>
    </div>

  )
}

export default SearchBar