import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DrinkGrid from '../components/DrinkGrid'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'

const BrowseContent: FC = () => {

    let { type, subtype } = useParams()

    const [url, setUrl] = useState<string>(`${baseUrl}${apiKey}/filter.php?`)
    
    
    useEffect(() => {
        let newUrl = url
        
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

        newUrl += "=" + subtype
        setUrl(newUrl)        
    }, [subtype])


    return (
        <div>
            {/* <TextLine text={subtype!} /> */}
            <DrinkGrid title={subtype!} url={url} />
        </div>
    )
}

export default BrowseContent