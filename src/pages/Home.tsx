import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import DrinkListItem, { IDrinkListItem } from '../components/DrinkListItem'
import { apiKey } from '../config/apiKey'
import './home.css'

const Home: FC = () => {

  const [drinks, setDrinks] = useState<IDrinkListItem[]>([])

  useEffect(() => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/popular.php`)
      .then(resp => {
        console.log(resp);
        let newDrinks = resp.data.drinks.map((e: any) => {

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

        setDrinks(newDrinks)
      })
  }, [])


  return (
    <div className='home'>
      <h2 style={{marginTop: 0}}>Popular drinks</h2>
      <div className='drink-grid'>
        {drinks.map((e: IDrinkListItem) => {
          // console.log(e);

          return <DrinkListItem key={e.id} id={e.id}
            name={e.name} thumbnail={e.thumbnail} ingredients={e.ingredients} measurements={e.measurements} />
        })}
      </div>
    </div>
  )
}

export default Home