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
    <div className="App">
      <div className="courseInfo">
        CMSC 216
        <p className="subText">
          Average GPA: {Math.round(data.average_gpa * 100) / 100}
        </p>
        <p className="subText">
          Title: <i>{data.title}</i>
        </p>
      </div>

      <div className="charts">
        <div className="chartsRow">
          <div className="dataCard">
            <div>Grade Distribution All-Time</div>
            <Bar
              data={{
                labels: ['A', 'B', 'C'],
                datasets: [
                  {
                    label: 'Number of Students',
                    data: ['200', '400', '800'],
                  },
                ],
              }}
            />
          </div>

          <div className="dataCard">
            <div>GPA Trend All-Time</div>
            <Bar
              data={{
                labels: ['A', 'B', 'C'],
                datasets: [
                  {
                    label: 'Number of Students',
                    data: ['200', '400', '800'],
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className="sectionDist">
          <SectionDistribution gradeData={gradeData} />
        </div>
      </div>
    </div>
  </>
)
}

export default App
