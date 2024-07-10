import { FC } from 'react'
import { Link } from 'react-router-dom'
import './drinkListItem.css'
import { IDrinkListItem } from './IDrinkListItem'

const DrinkListItem: FC<IDrinkListItem> = (props) => {
    return (
        <div className='drink-list-item'>
            <div>
                <Link to={`/drink/${props.id}`} onClick={props.callback}>
                    <img src={props.thumbnail + "/preview"} alt={props.name} title={props.name} />
                </Link>
            </div>
            <p>{props.name}</p>
        </div>
    )
}

export default DrinkListItem