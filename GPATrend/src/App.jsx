import { useEffect, useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
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
    <div className = "App">  
      
      <div className = "dataCard">
        <Bar
          data = {{
            labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: "Revenue",
                data: [200, 400 ,600]
              },
            ],
          }}>
        </Bar>
      </div>

    </div>
  </>
  )
}

export default App
