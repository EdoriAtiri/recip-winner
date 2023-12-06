import express from 'express'
import cors from 'cors'

import * as RecipeAPI from './recipe-api'

const app = express()

app.use(express.json())
app.use(cors())

// query recipes
app.get('/api/recipe/search', async (req, res) => {
  const searchTerm = req.query.searchTerm as string
  const page = parseInt(req.query.page as string)

  const results = await RecipeAPI.searchRecipes(searchTerm, page)
  return res.json(results)
})

// Get recipe summary
app.get('/api/recipe/:recipeId/summary', async (req, res) => {
  const recipeId = req.params.recipeId
  const result = await RecipeAPI.getRecipeSummary(recipeId)
  res.json(result)
})

app.listen(5000, () => {
  console.log('Server running on localhost:5000')
})
