import React, { useState } from 'react'
import CategoryItem from '../components/CategoryItem'
import './browse.css'
import { strings } from '../config/strings'

const Browse = () => {

  const [showAllCategory, setShowAllCategory] = useState<boolean>(false)
  const [showAllGlasses, setShowAllGlasses] = useState<boolean>(false)
  const categoryListLength = 5

  document.title = "Browse | Drinkos"
  document.getElementsByTagName('meta').namedItem("description")!.content = strings.metaDescription

  const alcoholContent = [
    "Alcoholic",
    "Non alcoholic",
    "Optional alcohol",
  ]

  const categories = [
    "Ordinary drink",
    "Cocktail",
    "Punch / Party Drink",
    "Shot",
    "Coffee / Tea",
    "Shake",
    "Cocoa",
    "Homemade Liqueur",
    "Beer",
    "Soft Drink",
  ]

  const glasses = [
    "Highball glass",
    "Cocktail glass",
    "Old-fashioned glass",
    "Champagne flute",
    "Shot glass",
    "Whiskey Glass",
    "Collins glass",
    "Pousse cafe glass",
    "Whiskey sour glass",
    "Cordial glass",
    "Brandy snifter",
    "White wine glass",
    "Nick and Nora Glass",
    "Hurricane glass",
    "Coffee mug",
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
        {showAllCategory ? categories.sort().map((e: string, i) =>
          <CategoryItem key={i} title={e} type={"category"} color="#a8c0ba" />)

          : [...Array(categoryListLength + 1)].map((e, i) => {
            return i === categoryListLength
              ? <span className='category-item' key={i} style={{ outline: "2px solid #a8c0ba", color: "#a8c0ba" }}
                onClick={() => setShowAllCategory(true)}>Show all {categories.length}</span>
              : <CategoryItem key={i} title={categories[i]} type={"category"} color="#a8c0ba" />
          })}
      </div>

      <h3>Glasses</h3>
      <div className='button-row'>
        {showAllGlasses ? glasses.sort().map((e: string, i) =>
          <CategoryItem key={i} title={e} type={"glass"} />)

          : [...Array(categoryListLength + 1)].map((e, i) => {
            return i === categoryListLength
              ? <span className='category-item' key={i} style={{ outline: "2px solid #a8b0c0", color: "#a8b0c0" }}
                onClick={() => setShowAllGlasses(true)}>Show all {glasses.length}</span>
              : <CategoryItem key={i} title={glasses[i]} type={"glass"} />
          })}
      </div>
    </div>
  )
}

export default Browse