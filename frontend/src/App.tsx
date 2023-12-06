import { useState, FormEvent, useRef } from 'react'
import './App.css'
import { searchRecipes } from './API'
import { Recipe } from './types'
import RecipeCard from './components/RecipeCard'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const page: React.MutableRefObject<number> = useRef<number>(1)

  // Search for recipe on submit
  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()
    page.current = 1

    try {
      const pageNumber: number = page.current
      const { results } = await searchRecipes(searchTerm, pageNumber)
      setRecipes(results)
    } catch (error) {
      console.error(error)
    }
  }

  // Load more recipes
  const handleViewMoreClick = async () => {
    try {
      const nextPage: number = page.current + 1
      const nextRecipes = await searchRecipes(searchTerm, nextPage)
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results])
      page.current = nextPage
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <RecipeCard />
      <form onSubmit={handleSearchSubmit}>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{' '}
        <button type='submit'>Submit</button>
      </form>
      {recipes.map((recipe: Recipe) => (
        <div key={recipe.id}>
          Recipe Image Location: {recipe.image}
          <br />
          Recipe Title: {recipe.title}
        </div>
      ))}

      <button onClick={handleViewMoreClick}>View More</button>
    </div>
  )
}

export default App
