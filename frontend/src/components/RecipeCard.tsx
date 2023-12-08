import '../App.css'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const RecipeCard = ({
  src,
  title,
  click,
  isFavorite,
  onFavoriteButtonClick,
}: {
  src: string
  title: string
  click: React.MouseEventHandler<HTMLButtonElement>
  isFavorite: boolean
  onFavoriteButtonClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button onClick={click} className='recipeCard'>
      <figure>
        <img src={src} alt='' />
      </figure>
      <div className='recipe-card-title'>
        <span onClick={onFavoriteButtonClick}>
          {isFavorite ? (
            <AiFillHeart size={25} color='red' />
          ) : (
            <AiOutlineHeart size={25} />
          )}{' '}
        </span>
        <h3>{title}</h3>
      </div>
    </button>
  )
}

export default RecipeCard
