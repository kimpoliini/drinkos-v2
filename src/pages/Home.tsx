import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import DrinkListItem, { IDrinkListItem } from '../components/DrinkListItem'
import TextLine from '../components/TextLine'
import { baseUrl, getDrinksFromUrl } from '../config/api'
import { apiKey } from '../config/apiKey'
import './home.css'

const Home: FC = () => {

  const [drinks, setDrinks] = useState<IDrinkListItem[]>([])

  useEffect(() => {
    getDrinksFromUrl(`${baseUrl + apiKey}/popular.php`).then(drinks => setDrinks(drinks))
  }, [])


  return (
    <div className='home'>
      <div style={{ display: 'flex', marginBottom: "2rem" }}>
        <TextLine text='Popular drinks' style={{ fontWeight: "normal" }} color="#404653" lineColor="#a8b0c0"/>

      </div>
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