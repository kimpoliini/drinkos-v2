import axios from "axios"
import { IDrinkListItem } from "../components/DrinkListItem"

export const baseUrl = "https://www.thecocktaildb.com/api/json/v2/"
export const getDrinksFromUrl = async (url: string) => {
    const promise = new Promise<IDrinkListItem[]>( (resolve, reject) => {
        resolve( axios.get(url)
            .then(resp => {                
                if(!resp.data.drinks) return []
                let drinks: IDrinkListItem[] = resp.data.drinks.map((e: any) => {

                    let ingredients: string[] = []
                    let measurements: string[] = []

                    for (let i = 0; i < 15; i++) {
                        let ingredient = e[`strIngredient${i + 1}`]
                        let measurement = e[`strMeasure${i + 1}`]

                        if (!ingredient && !measurement) break

                        if (ingredient) ingredients.push(ingredient)

                        if (measurement) measurements.push(measurement)
                    }

                    return {
                        id: e.idDrink,
                        name: e.strDrink,
                        thumbnail: e.strDrinkThumb,
                        ingredients: ingredients,
                        measurements: measurements,
                    }
                })

                return drinks
            })
        )
    })
    return promise
}