import { FC } from 'react'
import { DrinkGrid } from '../../components'
import { apiKey, baseUrl } from '../../config'

const Latest: FC = () => {
    return (
        <div>
            <DrinkGrid title='Latest drinks' url={`${baseUrl + apiKey}/latest.php`} />
        </div>
    )
}

export default Latest