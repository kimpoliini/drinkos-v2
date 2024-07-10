import { FC } from 'react'
import { useSearchParams } from 'react-router-dom';
import { DrinkGrid } from '../components';
import { apiKey, baseUrl } from '../config';

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