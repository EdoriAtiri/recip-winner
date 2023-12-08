import '../App.css'
import { AiOutlineHeart } from 'react-icons/ai'

const RecipeCard = ({
  src,
  title,
  click,
}: {
  src: string
  title: string
  click: React.MouseEventHandler<HTMLButtonElement>
}) => {
  const handleFavoriteClick = () => {}
  return (
    <button onClick={click} className='recipeCard'>
      <figure>
        <img src={src} alt='' />
      </figure>
      <div className='recipe-card-title'>
        <span onClick={handleFavoriteClick}>
          <AiOutlineHeart size={25} />
        </span>
        <h3>{title}</h3>
      </div>
    </button>
  )
}

export default RecipeCard
