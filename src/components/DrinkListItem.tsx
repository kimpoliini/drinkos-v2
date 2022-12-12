import React, { FC } from 'react'
import { Link } from 'react-router-dom'
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
                <Link to={`/${props.id}`}>
                    <img src={props.thumbnail + "/preview"} alt={props.name} />
                </Link>
            </div>
            <p>{props.name}</p>
        </div>
    )
}



export default DrinkListItem