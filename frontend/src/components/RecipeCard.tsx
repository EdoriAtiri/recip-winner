import '../App.css'
const RecipeCard = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className='recipeCard'>
      <figure>
        <img src={src} alt='' />
      </figure>
      <p>{title}</p>
    </div>
  )
}

export default RecipeCard
