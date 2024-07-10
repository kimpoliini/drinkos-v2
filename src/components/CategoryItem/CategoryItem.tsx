import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICategoryItem } from './ICategoryItem'
import './categoryItem.css'

const CategoryItem: FC<ICategoryItem> = (props) => {

    let style = {
        backgroundColor: props.color || "#a8b0c0",
        color: props.textColor || "white",
    }

    return (
        <Link to={`/browse/${props.type}/${props.title.replace("/", "%2f")}`} style={style} className="category-item">
            {props.title}
        </Link>
    )
}

export default CategoryItem