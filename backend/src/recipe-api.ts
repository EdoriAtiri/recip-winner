const dotenv = require('dotenv').config()

const API_KEY = process.env.API_KEY

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!API_KEY) {
    throw new Error('API key not found')
  }

  const baseURL = 'https://api.spoonacular.com/recipes/complexSearch'
  const url = new URL(baseURL)

  // type qp = {apiKey?: string,
  //   query?: string,
  //   number?: number,
  //   offset?: number}

  const queryParams: any = {
    apiKey: API_KEY,
    query: searchTerm,
    number: 10,
    offset: (page - 1) * 10,
  }

  url.search = new URLSearchParams(queryParams).toString()

  try {
    const searchResponse = await fetch(url.toString())
    const resultsJson = await searchResponse.json()
    return resultsJson
  } catch (error) {
    console.error(error)
  }
}
