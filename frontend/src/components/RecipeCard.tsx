import '../App.css'
const RecipeCard = ({
  src,
  title,
  click,
}: {
  src: string
  title: string
  click: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button onClick={click} className='recipeCard'>
      <figure>
        <img src={src} alt='' />
      </figure>
      <p>{title}</p>
    </button>
  )
}

export default RecipeCard
