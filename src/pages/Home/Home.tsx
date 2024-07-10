import { FC } from 'react'
import { DrinkGrid } from '../../components'
import { apiKey, baseUrl } from '../../config'

const Home: FC = () => {
  return (
    <div className='home'>
      <DrinkGrid title='Popular drinks' url={`${baseUrl + apiKey}/popular.php`} />
    </div>
  )
}

export default Home