import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IDrinkListItem } from '../components/DrinkListItem'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'
import './drinkInfo.css'

export interface IFullDrinkInfo extends IDrinkListItem {
    image: string,
    isAlcoholic?: boolean,
    category?: string,
    glassType?: string,
    instructions: string,
    tags?: string[],
}

function DrinkInfo() {
    let { id } = useParams()
    let url = `${baseUrl + apiKey}/lookup.php?i=${id}`

    const [drink, setDrink] = useState<IFullDrinkInfo>()

    useEffect(() => {
        axios.get(url)
            .then(resp => {
                console.log(resp.data.drinks[0]);

                let d = resp.data.drinks[0]
                let drink: IFullDrinkInfo

                let ingredients: string[] = []
                let measurements: string[] = []

                // Turns each individual ingredient and measurements
                // into an array
                for (let i = 0; i < 15; i++) {
                    let ingredient = d[`strIngredient${i + 1}`]
                    let measurement = d[`strMeasure${i + 1}`]

                    if (!ingredient && !measurement) break

                    if (ingredient) ingredients.push(ingredient)

                    if (measurement) measurements.push(measurement)
                }

                drink = {
                    id: d.idDrink,
                    name: d.strDrink,
                    ingredients: ingredients,
                    measurements: measurements,
                    image: d.strDrinkThumb,
                    instructions: d.strInstructions
                }

                setDrink(drink)

            })
    }, [id])

    return (
        <div className='drink-info'>
            <img src={drink?.image} alt={drink?.name} />
            <h2 style={{ fontWeight: "normal" }}>{drink?.name}</h2>
            <div className='ingredients'>
                <h3>Ingredients</h3>
                <ul>
                    {drink?.ingredients.map((e: string, i) =>
                        <li>{`${drink?.measurements[i] ? drink?.measurements[i] : ""} ${e}`}</li>
                    )}
                </ul>
                
                <h3>Instructions</h3>
                <p>{drink?.instructions}</p>
            </div>
        </div>
    )
}

export default DrinkInfo