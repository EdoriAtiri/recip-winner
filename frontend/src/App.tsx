import { useState, FormEvent } from 'react'
import './App.css'
import { searchRecipes } from './API'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState([])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const { results } = await searchRecipes(searchTerm, 1)
      setRecipes(results)
    } catch (error) {
      console.error(error)
    }
  }

  return <div>Hello from Recipe App</div>
}

export default App
