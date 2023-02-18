import React, { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import DrinkGrid from '../components/DrinkGrid';
import { baseUrl } from '../config/api';
import { apiKey } from '../config/apiKey';

const Search: FC = () => {

    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState<string>(searchParams.get("q")!)

    useEffect(() => {
        setQuery(searchParams.get("q")!)
    }, [searchParams])

    return (
        <div>
            <DrinkGrid title={`Search results for ${query}`} url={`${baseUrl + apiKey}/search.php?s=${query}`} />
        </div>
    )
}

export default Search