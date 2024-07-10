import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiKey } from '../../config';

const RandomDrink: FC = () => {
    const [message, setMessage] = useState<string>("Getting your drink...")
    const navigate = useNavigate()

    fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/random.php`)
        .then(async resp => {
            if (resp.ok) {
                const data = await resp.json()
                navigate(`/drink/${data.drinks[0].idDrink}`)
            }
        }, () => {
            setMessage("Cannot get drink, redirecting")
            setTimeout(() => navigate("/"), 1000)
        })

    return (
        <div>{message}</div>
    )
}

export default RandomDrink