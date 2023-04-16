import React, { FC } from 'react'
import './iconWithText.css'

export interface IIconWithText {
    text: string,
    src: string,
    size?: string,
    link?: string,
}

const IconWithText: FC<IIconWithText> = (props) => {

    let wh = 0
    switch (props.size) {
        case "small":
            wh = 24
            break
        case "big":
            wh = 48
            break
        default:
            wh = 32
            break
    }

    return (
        <a href={props.link}
            style={props.link ? {} : { color: "inherit", cursor: "auto" }}
            className='icon'
            target='_blank'
            rel='nofollow'>
            <img src={props.src}
                alt={props.text}
                style={{
                    height: wh + "px", width: wh + "px", 
                }}
            />

            {props.text ? props.text : null}
        </a>
    )
}

export default IconWithText