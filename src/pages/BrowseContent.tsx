import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { DrinkGrid } from '../components'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'

const BrowseContent: FC = () => {

    let { type, subtype } = useParams()

    const getUrl = () => {
        let newUrl = `${baseUrl}${apiKey}/filter.php?`

        switch (type) {
            case "alcohol":
                newUrl += "a"
                break
            case "category":
                newUrl += "c"
                break
            case "glass":
                newUrl += "g"
                break
        }

        return newUrl + "=" + subtype
    }

    return (
        <div>
            <DrinkGrid title={subtype!} url={getUrl()} />
        </div>
    )
}

export default BrowseContent