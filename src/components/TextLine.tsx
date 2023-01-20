import React, { FC, useEffect } from 'react'
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
        color: (props.color ? props.color : "black"),
    }

    const customLine = "1px solid" +
        (props.color
            ? (props.lineColor
                ? props.lineColor
                : props.color)
            : "black")

    useEffect(() => {
        let span: HTMLElement = document.querySelector(".text-line > span")!
        if (span) span.style.setProperty("--line", customLine)
    }, [props.text])

    return (
        <h2 className='text-line'style={textLineStyle}>
            {props.text !== "" ?
                <span>
                    {props.text}
                </span>
                : null}
        </h2>
    )
}

export default TextLine