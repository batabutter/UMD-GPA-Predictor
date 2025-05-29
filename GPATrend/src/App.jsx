import { useEffect, useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
import './App.css'
import {SectionDistribution} from "./SectionDist"

function App() {
  const [data, setData] = useState([{}])
  const [gradeData, setGradeData] = useState([{}])

  // Start by fetching basic user data information
  useEffect(() => {
  fetch("/course_info")
    .then(res => res.json())
    .then(data => {
      setData(data)
    })

}, []);

  useEffect(() => {
  fetch("/course_grade_dis")
    .then(res => res.json())
    .then(data => {
      const raw = data[0]; // since it's an array with one object
      const gradeKeys = Object.keys(raw).filter(
        key => !["course", "professor", "section", "semester"].includes(key)
      );

      const gradeArray = gradeKeys.map(grade => ({
        grade,
        count: raw[grade],
      }));

      setGradeData(gradeArray);
      console.log(gradeArray);
    });
  }, []);

  return (
    <>
    <div className = "App">  
      <div className="title">
        CMSC 216
        <p className="subText">Average GPA: {Math.round(data.average_gpa * 100) / 100}
          </p>
        <p className="subText" >Title: <i>{data.title}</i> </p>
      </div>
      <div className = "dataCard">
        <div>Grade Distribution by Section</div>
        <Bar
          data = {{
            labels: gradeData.map( item => item.grade),
            datasets: [
              {
                label: "Number of Students",
                data: gradeData.map ( item => item.count)
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
