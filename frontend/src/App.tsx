import { useState, FormEvent, useRef, useEffect } from 'react'
import './App.css'
import { searchRecipes, getFavoriteRecipes } from './API'
import { Recipe } from './types'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'

type Tabs = 'search' | 'favorites'

const App = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>('search')
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  )
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

  useEffect(() => {
    // Get favorite recipes
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await getFavoriteRecipes()
        setFavoriteRecipes(favoriteRecipes.results)
      } catch (error) {
        console.error(error)
      }
    }

    fetchFavoriteRecipes()
  }, [])

  // Favorite a recipe
  const addAfavoriteRecipe = async (recipe) => {
    try {
      await addFavoriteRecipe(recipe)
      setFavoriteRecipes([...favoriteRecipes, recipe])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <div className='tabs'>
        <button onClick={() => setSelectedTab('search')}>Recipe Search</button>
        <button onClick={() => setSelectedTab('favorites')}>Favorites</button>
      </div>

      {selectedTab === 'search' && (
        <div>
          <form onSubmit={handleSearchSubmit}>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{' '}
            <button type='submit'>Submit</button>
          </form>

          <div className='cardContainer'>
            {recipes.map((recipe: Recipe) => (
              <RecipeCard
                click={() => setSelectedRecipe(recipe)}
                key={recipe.id}
                src={recipe.image}
                title={recipe.title}
              />
            ))}
          </div>

          <button onClick={handleViewMoreClick}>View More</button>
        </div>
      )}

      {selectedTab === 'favorites' && (
        <div className='cardContainer'>
          {favoriteRecipes.map((recipe: Recipe) => (
            <RecipeCard
              click={() => setSelectedRecipe(recipe)}
              key={recipe.id}
              src={recipe.image}
              title={recipe.title}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      )}
    </div>
  )
}

export default App
