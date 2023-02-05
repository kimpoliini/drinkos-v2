import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IDrinkListItem } from '../components/DrinkListItem'
import TagItem from '../components/TagItem'
import TextLine from '../components/TextLine'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'
import './drinkInfo.css'
import ColorThief from 'colorthief'
import { resolve } from 'path'
import { rejects } from 'assert'


export interface IFullDrinkInfo extends IDrinkListItem {
    image: string,
    isAlcoholic?: boolean,
    category?: string,
    glassType?: string,
    instructions: string,
    tags?: string[],
}

const colorThief = new ColorThief()

function DrinkInfo() {
    let { id } = useParams()
    let url = `${baseUrl + apiKey}/lookup.php?i=${id}`

    const [drink, setDrink] = useState<IFullDrinkInfo>()
    const [tagColor, setTagColor] = useState<number[]>([])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        axios.get(url)
            .then(resp => {
                console.log(resp.data.drinks[0]);

                let d = resp.data.drinks[0]
                let drink: IFullDrinkInfo

                let ingredients: string[] = []
                let measurements: string[] = []

                let tags: string[] = []

                // Turns each individual ingredient and measurements
                // into an array
                for (let i = 0; i < 15; i++) {
                    let ingredient = d[`strIngredient${i + 1}`]
                    let measurement = d[`strMeasure${i + 1}`]

                    if (!ingredient && !measurement) break

                    if (ingredient) ingredients.push(ingredient)

                    if (measurement) measurements.push(measurement)
                }

                // Turns all tags into an array
                if (d.strTags) {
                    tags = d.strTags.split(",").map((e: string) => e.charAt(0).toUpperCase() + e.slice(1, e.length));
                }

                drink = {
                    id: d.idDrink,
                    name: d.strDrink,
                    ingredients: ingredients,
                    measurements: measurements,
                    image: d.strDrinkThumb,
                    instructions: d.strInstructions,
                    glassType: d.strGlass,
                    tags: tags,
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

            <TextLine text={drink?.name || ""} color="#404653" lineColor="#a8b0c0"
                style={{ fontWeight: "normal" }} />
            <img id="drink-image" src={drink?.image} alt={drink?.name}
                onLoad={async (e) => {
                    let img = (e.target as HTMLImageElement)

                    if (img.complete) {
                        img.setAttribute("crossOrigin", "")

                        let color = await colorThief.getColor(img)

                        setTagColor(color)

                        // let palette = await colorThief.getPalette(img)

                        // console.log(`%ccolor: ${color}`, `background: rgb(${color.join(",")}); padding: 1rem;`)

                        // palette.forEach((pal: number[], i: number) => {
                        //     console.log(`%ccolor ${i + 1}: ${pal}`, `background: rgb(${pal.join(",")}); padding: 1rem;`)
                        // });

                    }

                }} />
            <div className='tag-list' style={drink?.tags?.length! > 0 ? {} : { display: "none" }}>
                {drink?.tags ? drink.tags.map((e: string, i) =>
                    <TagItem key={i} title={e} color={tagColor ? `rgba(${tagColor.join(",")}, 1)` : ""} />) : ""}
            </div>
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
            <div className='extra-info'>
                <TagItem title={drink?.glassType!} icon="wine_bar" big />
            </div>
        </div>
    )
}

export default DrinkInfo