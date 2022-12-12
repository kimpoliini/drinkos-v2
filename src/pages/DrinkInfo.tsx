import React from 'react'
import { useParams } from 'react-router-dom'

function DrinkInfo() {
    let { id } = useParams()
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

export default DrinkInfo