import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { getDrinkListFromApiResults } from '../config/api'
import DrinkListItem, { IDrinkListItem } from './DrinkListItem'
import TextLine from './TextLine'
import './drinkGrid.css'
import { useQuery } from 'react-query'
import { Location, useLocation, useNavigate, useNavigationType, useParams, useSearchParams, } from 'react-router-dom'
import { ScrollContext } from '../config/ScrollContext'

export interface IDrinkGrid {
    title: string,
    url: string,
}

const DrinkGrid: FC<IDrinkGrid> = (props) => {
    const [hasResults, setHasResults] = useState<boolean>(true)
    const [pages, setPages] = useState<[IDrinkListItem[]]>([[]])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [searchParams] = useSearchParams()

    const navigationType = useNavigationType()
    const location = useLocation()
    const prevLocation = useRef<Location>()
    let scroll = useContext(ScrollContext)

    const { data, isLoading } = useQuery("data" + props.url, async () => {
        const resp = await fetch(props.url)
        return await resp.json()
    })

    // Restore scroll if navigating back
    useEffect(() => {
        if (pages[0].length > 0 && navigationType === "POP" && scroll.value > 0) {
            window.scrollTo({ top: scroll.value })
            scroll.setValue(0)
        }
    }, [pages])

    useEffect(() => {
        if (prevLocation.current?.pathname !== location.pathname) setPages([[]])

        prevLocation.current = location
    }, [location])

    useEffect(() => {
        console.log(location);

        if (data) {
            let drinks = getDrinkListFromApiResults(data.drinks)
            let perPage = 25
            let count = drinks.length

            if (count > 0) {
                let pages = Math.floor((count / perPage) == 1 ? 0 : (count / perPage)) + 1
                let newPages: [IDrinkListItem[]] = [[]]

                for (let i = 0; i < pages; i++) {
                    if (i + 1 === pages) {
                        if (drinks.length === perPage) {
                            newPages[i] = drinks
                            break
                        }

                        newPages[i] = drinks.slice(i * perPage, i * perPage + (count % perPage))
                    } else {
                        newPages[i] = drinks.slice(i * perPage, (i + 1) * perPage)
                    }
                }

                setPages(newPages)
            } else {
                setPages([[]])
                setHasResults(false)
            }

            // Check after loading the data if there is a valid page number 
            // parameter in the URL and sets the current page to that
            const pageFromUrl = parseInt(searchParams.get("p") || "") - 1 || 0
            if (pageFromUrl) setCurrentPage(pageFromUrl)
        }

    }, [data])

    function scrollToTop() {
        if (pages[0].length > 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            scroll.setValue(0)
        }
    }

    function replaceUrl(pageNumber: number) {
        let url = location.pathname
        let char = '?'

        console.log(location);
        if (location.search) {
            url += location.search
            char = "&"
        }



        window.history.pushState({}, "", `#${url}${char}p=${pageNumber}`)
        scrollToTop()

    }

    const decPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
        replaceUrl(currentPage)
    }
    const incPage = () => {
        if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1)
        replaceUrl(currentPage + 2)
    }

    return (
        <div>
            <TextLine text={props.title} style={{ fontWeight: "normal" }} color="#404653" lineColor="#a8b0c0" />
            <div className='drink-grid'>
                {pages[currentPage].length > 0 ? pages[currentPage].map((e: IDrinkListItem, i) => {
                    return <DrinkListItem key={e.id} id={e.id}
                        name={e.name} thumbnail={e.thumbnail}
                        ingredients={e.ingredients}
                        measurements={e.measurements}
                        callback={() => { scroll.setValue(window.scrollY) }} />
                }) : (hasResults ? null : <p>No results</p>)}
            </div>
            <div className='page-indicator' style={pages.length > 1 ? {} : { display: "none" }}>
                <span className={`material-icons ${currentPage === 0 ? "indicator-disabled" : ""}`}
                    onClick={() => decPage()}>
                    keyboard_arrow_left
                </span>
                {[...Array(pages.length)].map((e, i) => (
                    <span key={i} className={currentPage === i ? "current-page" : ""}>{i + 1}</span>
                ))}
                <span className={`material-icons ${currentPage === pages.length - 1 ? "indicator-disabled" : ""}`}
                    onClick={() => incPage()}>
                    keyboard_arrow_right
                </span>
            </div>
        </div>)
}

export default DrinkGrid