import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'

export interface ICategoryItem {
    title: string,
    type: string,
    color?: string,
    textColor?: string,
}

const CategoryItem: FC<ICategoryItem> = (props) => {

    let style = {
        display: "inline-block",
        padding: "0.5rem",
        borderRadius: "12px",
        backgroundColor: props.color ? props.color : "#a8b0c0",
        color: props.textColor ? props.textColor : "white",
    }

    return (
        <Link to={`/browse/${props.type}/${props.title.replace("/", "%2f")}`} style={style}>
            {props.title}
        </Link>
    )
}

export default CategoryItem