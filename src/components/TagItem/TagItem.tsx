import { FC } from 'react'
import { ITagItem } from './ITagItem'
import './tagItem.css'

const TagItem: FC<ITagItem> = ({ title, color, big, icon, iconColor }) => {

    let style = {
        backgroundColor: color || "#404653",
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