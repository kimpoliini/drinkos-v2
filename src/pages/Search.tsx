import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom';
import DrinkGrid from '../components/DrinkGrid';
import { baseUrl } from '../config/api';
import { apiKey } from '../config/apiKey';

const Search: FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")!

    return (
        <div>
            <DrinkGrid title={`Search results for ${query}`}
                url={`${baseUrl + apiKey}/search.php?s=${query}`} />
        </div>
    )
}

export default Search