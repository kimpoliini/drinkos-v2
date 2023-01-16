import React, { FC } from 'react'
import DrinkGrid from '../components/DrinkGrid'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'

const Latest: FC = () => {
    return (
        <div>
            <DrinkGrid title='Latest drinks' url={`${baseUrl + apiKey}/latest.php`} />
        </div>
    )
}

export default Latest