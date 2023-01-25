import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IDrinkListItem } from '../components/DrinkListItem'
import TextLine from '../components/TextLine'
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
        window.scrollTo({ top: 0, behavior: 'smooth' })

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

    const formatMeasure = (measure: string) => {
        measure = measure.toLowerCase()

        switch (measure) {
            case "dash":
                return "Dash of"
            case "top":
                return "Top with"
            default:
                return measure.charAt(0).toUpperCase() + measure.slice(1)
        }
    }

    return (
        <div className='drink-info'>
            <img src={drink?.image} alt={drink?.name} />
            <TextLine text={drink?.name || ""} color="#404653" lineColor="#a8b0c0"
                style={{ fontWeight: "normal" }} />
            <div className='ingredients'>
                <h3>Ingredients</h3>
                <ul>
                    {drink?.ingredients.map((e: string, i) =>
                        <li key={i}>{`${drink?.measurements[i] ? formatMeasure(drink?.measurements[i]) : ""} ${e}`}</li>
                    )}
                </ul>

                <h3>Instructions</h3>
                <p>{drink?.instructions}</p>
            </div>
        </div>
    )
}

export default DrinkInfo