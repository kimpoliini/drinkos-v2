import React, { FC, useEffect, useState } from 'react'
import { baseUrl, getDrinksFromUrl } from '../config/api'
import DrinkListItem, { IDrinkListItem } from './DrinkListItem'
import TextLine from './TextLine'
import './drinkGrid.css'

export interface IDrinkGrid {
    title: string,
    url: string,
}

const DrinkGrid: FC<IDrinkGrid> = (props) => {
    const [drinks, setDrinks] = useState<IDrinkListItem[]>([])
    const [hasResults, setHasResults] = useState<boolean>(true)

    useEffect(() => {
        getDrinksFromUrl(props.url).then(drinks => {
            if (drinks.length > 0) {
                setDrinks(drinks)
            } else {
                setDrinks([])
                setHasResults(false)
            }
        })
    }, [props.url])

    return (
        <div>
            <TextLine text={props.title} style={{ fontWeight: "normal" }} color="#404653" lineColor="#a8b0c0" />

            <div className='drink-grid'>
                {drinks.length > 0 ? drinks.map((e: IDrinkListItem) => {
                    return <DrinkListItem key={e.id} id={e.id}
                        name={e.name} thumbnail={e.thumbnail} ingredients={e.ingredients} measurements={e.measurements} />
                }) : (hasResults ? null : <p>No results</p>)}
            </div>
        </div>)
}

export default DrinkGrid