import React, { FC } from 'react'
import './tagItem.css'

export interface ITagItem {
    title: string,
    color?: string,
    big?: boolean,
    icon?: string,
    iconColor?: string,
}

const TagItem: FC<ITagItem> = ({ title, color, big, icon, iconColor }) => {

    let style = {
        backgroundColor: color ? color : "#404653",
    }

    return (
        <div style={style} className={`tag-item ${big ? "tag-item-big" : ""}`}>
            {icon ? <span className="material-icons">{icon}</span> : null}
            <span>
                {title}
            </span>
        </div>
    )
}

export default TagItem