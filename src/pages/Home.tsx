import { FC } from 'react'
import { DrinkGrid } from '../components'
import { baseUrl } from '../config/api'
import { apiKey } from '../config/apiKey'

const Home: FC = () => {
  return (
    <div className='home'>
      <DrinkGrid title='Popular drinks' url={`${baseUrl + apiKey}/popular.php`} />
    </div>
  )
}

export default Home