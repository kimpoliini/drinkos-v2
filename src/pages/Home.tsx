import React, { FC, useEffect, useState } from 'react'
import DrinkGrid from '../components/DrinkGrid'
import { baseUrl, getDrinksFromUrl } from '../config/api'
import { apiKey } from '../config/apiKey'
import './home.css'

const Home: FC = () => {
  return (
    <div className='home'>
      <DrinkGrid title='Popular drinks' url={`${baseUrl + apiKey}/popular.php`} />
    </div>
  )
}

export default Home