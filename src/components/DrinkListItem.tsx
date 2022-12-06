import React, { FC } from 'react'
import './drinkListItem.css'

export interface IDrinkListItem {
    id: string,
    name: string,
    thumbnail: string,
    ingredients: string[],
    measurements: string[],
}

const DrinkListItem: FC<IDrinkListItem> = (props) => {
    return (
        <div className='drink-list-item'>
            <div>
                <img src={props.thumbnail + "/preview"} alt={props.name} />
            </div>
            <p>{props.name}</p>
        </div>
    )
}



export default DrinkListItem