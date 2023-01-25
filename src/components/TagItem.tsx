import React, { FC } from 'react'

const TagItem:FC<{title: string}> = ({ title }: { title: string }) => {

    let style = {
        display: "inline-block",
        backgroundColor: "#e09090",
        borderRadius: "6px",
        color: "white",
        padding: "0.25rem 0.5rem 0.25rem 0.5rem",
        fontSize: "10pt",

    }

    return (
        <span style={style}>{title}</span>
    )
}

export default TagItem