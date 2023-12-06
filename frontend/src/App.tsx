import { useState, FormEvent } from 'react'
import './App.css'
import { searchRecipes } from './API'
import { Recipe } from './types'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const { results } = await searchRecipes(searchTerm, 1)
      setRecipes(results)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <button type='submit'>Submit</button>
      </form>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          Recipe Image Location: {recipe.image}
          <br />
          Recipe Title: {recipe.title}
        </div>
      ))}
    </div>
  )
}

export default App
