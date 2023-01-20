import React, { FC, useEffect, useState } from 'react'
import { baseUrl, getDrinksFromUrl } from '../config/api'
import DrinkListItem, { IDrinkListItem } from './DrinkListItem'
import TextLine from './TextLine'
import './drinkGrid.css'
import { useParams } from 'react-router-dom'

export interface IDrinkGrid {
    title: string,
    url: string,
}

const DrinkGrid: FC<IDrinkGrid> = (props) => {
    const [drinks, setDrinks] = useState<IDrinkListItem[]>([])
    // let {id} = useParams()

    useEffect(() => {
        getDrinksFromUrl(props.url).then(drinks => setDrinks(drinks))
    }, [])

    return (
        <div>
            <TextLine text={props.title} style={{ fontWeight: "normal" }} color="#404653" lineColor="#a8b0c0" />
            
            <div className='drink-grid'>
                {drinks.map((e: IDrinkListItem) => {
                    return <DrinkListItem key={e.id} id={e.id}
                        name={e.name} thumbnail={e.thumbnail} ingredients={e.ingredients} measurements={e.measurements} />
                })}
            </div>
        </div>)
}

export default DrinkGrid