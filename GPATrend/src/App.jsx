import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
  fetch("/coursedata")
    .then(res => res.json())
    .then(data => {
      setData(data)
      console.log(data)
    })

}, []);


  return (
    <>
    <div>
      {(typeof data.sections === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.sections.map((section, i) => (
          <p key={i}>{section}</p>
        ))
      )}
    </div>
  </>
  )
}

export default App
