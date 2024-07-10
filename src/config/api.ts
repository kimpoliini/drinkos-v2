import { IDrinkListItem } from "../components"
import { strings } from "./strings"

export const baseUrl = "https://www.thecocktaildb.com/api/json/v2/"

export const getDrinkListFromApiResults = (data: []) => {
    document.getElementsByTagName('meta').namedItem("description")!.content = strings.metaDescription

    let drinks: IDrinkListItem[] = []
    if (data) drinks = data.map((e: any) => {

        let ingredients: string[] = [],
            measurements: string[] = []

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
            ingredients,
            measurements,
        }
    })

    return drinks
}

export const getSearchResultsFromApiResults = (data: any) => {
    let d = data.drinks, drinks: IDrinkListItem[] = []

    if (d) {
        drinks = d.map((e: any) => {
            return {
                id: e.idDrink,
                name: e.strDrink,
                category: e.strCategory
            }
        })
    }

    return drinks
}

export const getDrinkInfoFromApiResults = (data: any) => {
    let d = data.drinks[0]

    let ingredients: string[] = [],
        measurements: string[] = [],
        tags: string[] = []

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
        tags = d.strTags.split(",").map((e: string) => e[0].toUpperCase() + e.slice(1));
    }

    return {
        id: d.idDrink,
        name: d.strDrink,
        ingredients,
        measurements,
        image: d.strDrinkThumb,
        instructions: d.strInstructions,
        glassType: d.strGlass,
        category: d.strCategory,
        alcoholic: d.strAlcoholic,
        tags,
    }
}

export const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1, string.length)