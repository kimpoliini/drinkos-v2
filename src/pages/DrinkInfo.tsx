import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IDrinkListItem } from '../components/DrinkListItem'
import TagItem from '../components/TagItem'
import TextLine from '../components/TextLine'
import { baseUrl, getDrinkInfoFromApiResults } from '../config/api'
import { apiKey } from '../config/apiKey'
import './drinkInfo.css'
import ColorThief from 'colorthief'
import { useQuery } from 'react-query'

export interface IFullDrinkInfo extends IDrinkListItem {
    image: string,
    alcoholic?: string,
    glassType?: string,
    instructions: string,
    tags?: string[],
}

const colorThief = new ColorThief()

function DrinkInfo() {
    const [drink, setDrink] = useState<IFullDrinkInfo>()
    const [tagColor, setTagColor] = useState<number[]>([])
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    let { id } = useParams()
    let url = `${baseUrl + apiKey}/lookup.php?i=${id}`

    let { data, isLoading } = useQuery("drink-info-" + id, async () => {
        const resp = await fetch(url)
        return await resp.json()
    })

    useEffect(() => {
        if (isLoading) {
            setDrink(undefined)
            setImageLoaded(false)
        } else window.scrollTo({ top: 0, behavior: 'smooth' })

    }, [isLoading])

    useEffect(() => {
        if (data) {
            setDrink(getDrinkInfoFromApiResults(data))
            console.log(data.drinks[0].strDrink);
            
            document.title = data.drinks[0].strDrink + " | Drinkos"
        }
    }, [data])

    const formatMeasure = (measure: string) => {
        measure = measure.toLowerCase()

        switch (measure) {
            case "dash":
                return "Dash of"
            case "top":
                return "Top with"
            default:
                return measure[0].toUpperCase() + measure.slice(1)
        }
    }

    return (
        <div className='drink-info'>

            <TextLine text={drink?.name || ""} color="#404653" lineColor="#a8b0c0"
                style={{ fontWeight: "normal" }} />
            <img id="drink-image"
                src={drink?.image} alt={drink?.name}
                className={imageLoaded ? "" : "image-loading"}
                onLoad={async (e) => {
                    let img = (e.target as HTMLImageElement)
                    img.setAttribute("crossOrigin", "")

                    if (img.complete) {
                        setImageLoaded(true)
                        setTagColor(await colorThief.getColor(img))
                    }
                }} />
            <div className='tag-list' style={drink?.tags?.length! > 0 ? {} : { display: "none" }}>
                {drink?.tags ? drink.tags.map((e: string, i) =>
                    <TagItem key={i} title={e} color={tagColor ? `rgba(${tagColor.join(",")}, 1)` : ""} />) : ""}
            </div>
            <div className='ingredients'>
                <h3>Ingredients</h3>
                <ul>
                    {drink?.ingredients!.map((e: string, i) =>
                        <li key={i}>{`${drink?.measurements![i] ? formatMeasure(drink?.measurements[i]) : ""} ${e}`}</li>
                    )}
                </ul>

                <h3>Instructions</h3>
                <p>{drink?.instructions}</p>
            </div>
            {!isLoading ? <div className='extra-info'>
                <TagItem title={drink?.glassType!} icon="wine_bar" big color={"#a8b0c0"} />
                <TagItem title={drink?.category!} icon="category" big color={"#a8b0c0"} />
                <TagItem title={drink?.alcoholic!}
                    icon={drink?.alcoholic === "Alcoholic"
                        ? "liquor" : (drink?.alcoholic === "Non alcoholic"
                            ? "no_drinks" : "local_bar")}
                    big
                    color={"#a8b0c0"} />
            </div> : null}
        </div>
    )
}

export default DrinkInfo