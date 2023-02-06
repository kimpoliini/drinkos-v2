import React, { FC, useEffect, useState } from 'react'
import { getDrinkListFromApiResults, getDrinksFromUrl } from '../config/api'
import DrinkListItem, { IDrinkListItem } from './DrinkListItem'
import TextLine from './TextLine'
import './drinkGrid.css'
import { useQuery } from 'react-query'

export interface IDrinkGrid {
    title: string,
    url: string,
}

const DrinkGrid: FC<IDrinkGrid> = (props) => {
    const [hasResults, setHasResults] = useState<boolean>(true)
    const [pages, setPages] = useState<[IDrinkListItem[]]>([[]])
    const [currentPage, setCurrentPage] = useState<number>(0)

    const { data, isLoading } = useQuery("data", () => {
        // return getDrinksFromUrl(props.url).then(drinks => {
        //     let perPage = 25
        //     let count = drinks.length

        //     console.log("fetch")

        //     if (count > 0) {
        //         let pages = Math.floor((count / perPage) == 1 ? 0 : (count / perPage)) + 1
        //         let newPages: [IDrinkListItem[]] = [[]]

        //         for (let i = 0; i < pages; i++) {
        //             if (i + 1 === pages) {
        //                 if (drinks.length === perPage) {
        //                     newPages[i] = drinks
        //                     break
        //                 }

        //                 newPages[i] = drinks.slice(i * perPage, i * perPage + (count % perPage))
        //             } else {
        //                 newPages[i] = drinks.slice(i * perPage, (i + 1) * perPage)
        //             }
        //         }

        //         setPages(newPages)
        //     } else {
        //         setPages([[]])
        //         setHasResults(false)
        //     }
        // })
        return fetch(props.url).then(resp => resp.json())
    })

    useEffect(() => {
        if(pages.length > 1) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])

    useEffect(() => {
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


        }
    }, [data])

    // useEffect(() => {
    //     getDrinksFromUrl(props.url).then(drinks => {
    //         let perPage = 25
    //         let count = drinks.length

    //         console.log("fetch")

    //         if (count > 0) {
    //             let pages = Math.floor((count / perPage) == 1 ? 0 : (count / perPage)) + 1
    //             let newPages: [IDrinkListItem[]] = [[]]

    //             for (let i = 0; i < pages; i++) {                    
    //                 if (i + 1 === pages) {
    //                     if(drinks.length === perPage){
    //                         newPages[i] = drinks
    //                         break
    //                     }

    //                     newPages[i] = drinks.slice(i * perPage, i * perPage + (count % perPage))
    //                 } else {
    //                     newPages[i] = drinks.slice(i * perPage, (i + 1) * perPage)
    //                 }
    //             }

    //             setPages(newPages)
    //         } else {
    //             setPages([[]])
    //             setHasResults(false)
    //         }
    //     })
    // }, [props.url])

    const decPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1) }
    const incPage = () => { if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1) }

    return (
        <div>
            <TextLine text={props.title} style={{ fontWeight: "normal" }} color="#404653" lineColor="#a8b0c0" />

            <div className='drink-grid'>
                {pages[currentPage].length > 0 ? pages[currentPage].map((e: IDrinkListItem) => {
                    return <DrinkListItem key={e.id} id={e.id}
                        name={e.name} thumbnail={e.thumbnail} ingredients={e.ingredients} measurements={e.measurements} />
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