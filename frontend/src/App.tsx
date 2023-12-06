import { useState } from 'react'
import './App.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState([])

  return <div>Hello from Recipe App</div>
}

export default App
