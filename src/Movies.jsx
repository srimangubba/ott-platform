import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const Card = ({ title }) => {

  const [liked, setLiked] = useState(false)

  const [count, setCount] = useState(0)

  useEffect(() => {
    
  }, [liked]);

  return (
    <div className='card' onClick={()=> {setCount(count+1)}}>
      <h2>{title}-{count}</h2>
      <button className ='card-button' onClick={()=>{setLiked(!liked)}}>
        {liked?`:)`:`:(`}</button>
    </div>
  )
}

function Movies() {

  return (
    <div className='card-container'>
      {/* <h2>Hello React19</h2> */}
      <Card title="Pushpa" />
      <Card title="Devara" />
      <Card title="Peddi" />
    </div>
  )
}

export default Movies
