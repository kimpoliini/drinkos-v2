import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './categoryItem.css'

export interface ICategoryItem {
    title: string,
    type: string,
    color?: string,
    textColor?: string,
}

const CategoryItem: FC<ICategoryItem> = (props) => {

    let style = {
        backgroundColor: props.color ? props.color : "#a8b0c0",
        color: props.textColor ? props.textColor : "white",
    }

    return (
        <Link to={`/browse/${props.type}/${props.title.replace("/", "%2f")}`} style={style} className="category-item">
            {props.title}
        </Link>
    )
}

export default CategoryItem