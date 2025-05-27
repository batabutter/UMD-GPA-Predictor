import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

  // Start by fetching basic user data information
  useEffect(() => {
  fetch("/course_info")
    .then(res => res.json())
    .then(data => {
      setData(data)
      console.log(data)
    })

}, []);


  return (
    <>
    <div>
    </div>
  </>
  )
}

export default App
