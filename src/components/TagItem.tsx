import React, { FC } from 'react'
import './tagItem.css'

export interface ITagItem {
    title: string,
    color?: string,
}

const TagItem:FC<ITagItem> = ({title, color}) => {

    let style = {
        backgroundColor: color ? color : "#404653",
    }

    return (
        <span style={style} className="tag-item">{title}</span>
    )
}

export default TagItem