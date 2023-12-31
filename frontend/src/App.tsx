import { useState, FormEvent, useRef, useEffect } from 'react'
import './App.css'
import {
  searchRecipes,
  getFavoriteRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from './API'
import { Recipe } from './types'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'
import hero from './assets/hero-image.jpg'
import { AiOutlineSearch } from 'react-icons/ai'

type Tabs = 'search' | 'favorites'

const App = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>('search')
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])
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
  const favoriteRecipe = async (recipe: Recipe) => {
    try {
      await addFavoriteRecipe(recipe)
      setFavoriteRecipes([...favoriteRecipes, recipe])
    } catch (error) {
      console.log(error)
    }
  }

  // Unfavorite a recipe
  const unfavoriteRecipe = async (recipe: Recipe) => {
    try {
      await removeFavoriteRecipe(recipe)
      const updatedRecipes = favoriteRecipes.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      )
      setFavoriteRecipes(updatedRecipes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <header className='header'>
        <img src={hero} alt='Hero' />
        <div className='title'>My Recipe App</div>
      </header>

      <div className='tabs'>
        <button
          className={`tab ${selectedTab === 'search' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('search')}
        >
          Recipe Search
        </button>
        <button
          className={`tab ${selectedTab === 'favorites' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('favorites')}
        >
          Favorites
        </button>
      </div>

      {/* Search */}
      {selectedTab === 'search' && (
        <div className='main'>
          <form onSubmit={handleSearchSubmit}>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{' '}
            <button>
              <AiOutlineSearch size={40} />
            </button>{' '}
          </form>

          <div className='cardContainer'>
            {recipes.map((recipe: Recipe) => {
              // Determine favorite state for each recipe inside the map function
              const isFavorite = favoriteRecipes.some(
                (favRecipe) => favRecipe.id === recipe.id
              )

              return (
                <RecipeCard
                  click={() => setSelectedRecipe(recipe)}
                  key={recipe.id}
                  src={recipe.image}
                  title={recipe.title}
                  onFavoriteButtonClick={
                    isFavorite
                      ? () => unfavoriteRecipe(recipe)
                      : () => favoriteRecipe(recipe)
                  }
                  isFavorite={isFavorite}
                />
              )
            })}
          </div>

          <button className='view-more-button' onClick={handleViewMoreClick}>
            View More
          </button>
        </div>
      )}

      {selectedTab === 'favorites' && (
        <div className='cardContainer'>
          {favoriteRecipes.map((recipe: Recipe) => {
            // Determine favorite state for each recipe inside the map function
            const isFavorite = favoriteRecipes.some(
              (favRecipe) => favRecipe.id === recipe.id
            )

            return (
              <RecipeCard
                click={() => setSelectedRecipe(recipe)}
                key={recipe.id}
                src={recipe.image}
                title={recipe.title}
                onFavoriteButtonClick={
                  isFavorite
                    ? () => unfavoriteRecipe(recipe)
                    : () => favoriteRecipe(recipe)
                }
                isFavorite={isFavorite}
              />
            )
          })}
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
