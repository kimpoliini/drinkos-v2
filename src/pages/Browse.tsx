import React from 'react'
import CategoryItem from '../components/CategoryItem'
import './browse.css'

const Browse = () => {


  const alcoholContent = [
    "Alcoholic",
    "Non alcoholic",
    "Optional alcohol",
  ]

  const categories = [
    "Ordinary drink",
    "Cocktail",
    "Shake",
    "Cocoa",
    "Shot",
    "Coffee / Tea",
    "Homemade Liqueur",
    "Punch / Party Drink",
    "Beer",
    "Soft Drink",
  ]

  const glasses = [
    "Highball glass",
    "Cocktail glass",
    "Old-fashioned glass",
    "Whiskey Glass",
    "Collins glass",
    "Pousse cafe glass",
    "Champagne flute",
    "Whiskey sour glass",
    "Cordial glass",
    "Brandy snifter",
    "White wine glass",
    "Nick and Nora Glass",
    "Hurricane glass",
    "Coffee mug",
    "Shot glass",
    "Jar",
    "Irish coffee cup",
    "Punch bowl",
    "Pitcher",
    "Pint glass",
    "Copper Mug",
    "Wine Glass",
    "Beer mug",
    "Margarita/Coupette glass",
    "Beer pilsner",
    "Beer Glass",
    "Parfait glass",
    "Mason jar",
    "Margarita glass",
    "Martini Glass",
    "Balloon Glass",
    "Coupe Glass",
  ]


  return (
    <div className='browse'>
      <h2>Browse drinks</h2>
      <p>Explore drinks based on alcohol contents, category or type of glass.</p>

      <h3>Alcohol</h3>
      <div className='button-row'>
        {alcoholContent.map((e: string, i) => <CategoryItem key={i} title={e} type={"alcohol"} color="#c0a8a8" />)}
      </div>

      <h3>Category</h3>
      <div className='button-row'>
        {categories.map((e: string, i) => <CategoryItem key={i} title={e} type={"category"} color="#a8c0ba" />)}
      </div>

      <h3>Glasses</h3>
      <div className='button-row'>
        {glasses.map((e: string, i) => <CategoryItem key={i} title={e} type={"glass"} />)}

      </div>
    </div>
  )
}

export default Browse