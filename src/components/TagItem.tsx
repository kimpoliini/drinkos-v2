import React, { FC } from 'react'

export interface ITagItem {
    title: string,
    color?: string,
}

const TagItem:FC<ITagItem> = ({title, color}) => {

    let style = {
        display: "inline-block",
        backgroundColor: color ? color : "#404653",
        borderRadius: "6px",
        color: "white",
        padding: "0.25rem 0.5rem 0.25rem 0.5rem",
        fontSize: "10pt",
        opacity: "0.5",
        transition: "background-color 0.5s",
    }

    return (
        <span style={style}>{title}</span>
    )
}

export default TagItem