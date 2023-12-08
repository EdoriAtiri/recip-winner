import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import * as RecipeAPI from './recipe-api'

const prismaClient = new PrismaClient()

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

// Create favorite recipe
app.post('/api/recipes/favorite', async (req, res) => {
  const { recipeId } = req.body
  try {
    const favoriteRecipe = await prismaClient.favoriteRecipe.create({
      data: { recipeId },
    })
    res.status(201).json(favoriteRecipe)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Oops, something went wrong.' })
  }
})

// Fetch all favorite recipes
app.get('/api/recipes/favorite', async (req, res) => {
  try {
    const favoriteRecipes = await prismaClient.favoriteRecipe.findMany()
    const recipeIds = favoriteRecipes.map((recipe) =>
      recipe.recipeId.toString()
    )
    const favorites = await RecipeAPI.getFavoriteRecipesByIds(recipeIds)
    res.json(favorites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Oops, something went wrong.' })
  }
})

// Delete favorite recipe
app.delete('/api/recipes/favorite', async (req, res) => {
  const { recipeId } = req.body
  try {
    await prismaClient.favoriteRecipe.delete({
      where: { recipeId },
    })
    res.status(204).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Oops, something went wrong.' })
  }
})

app.listen(5000, () => {
  console.log('Server running on localhost:5000')
})
