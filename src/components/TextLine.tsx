import React, { FC } from 'react'
import './textLine.css'

export interface ITextLine {
    text: string,
    style?: object,
    color?: string,
    lineColor?: string,
}

const TextLine: FC<ITextLine> = (props) => {
    const textLineStyle = {
        ...props.style,
        borderBottom: "1px solid " + (props.color ? (props.lineColor ? props.lineColor : props.color) : "black"),
        color: (props.color ? props.color : "black"),
    }

    console.log(textLineStyle);

    return (
        <h2 className='text-line'
            style={textLineStyle}>
            <span>
                {props.text}
            </span>
        </h2>
    )
}

export default TextLine