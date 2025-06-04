import { useEffect, useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
import './App.css'
import {SectionDistribution} from "./SectionDist"
import { TotalDistribution } from './TotalDistribution';
import { GPATrend } from './GPATrend';

function App() {
  const [data, setData] = useState([{}])
  const [gradeData, setGradeData] = useState([{}])
  const [totalGradeData, setTotalGradeData] = useState([{}])

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
      const raw = data[0];
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

  useEffect(() => {
  fetch("/course_grade_dis")
    .then(res => res.json())
    .then(data => {
      const cumulativeGrades = {};

      data.forEach(item => {
        Object.keys(item).forEach(key => {
        if (!["Other", "course", "professor", "section", "semester"].includes(key)) {
          if (!cumulativeGrades[key]) 
            cumulativeGrades[key] = 0;
          cumulativeGrades[key] += item[key]
        }
        })
      });
    
      const gradeArr = Object.entries(cumulativeGrades).map(([grade, count]) => ({
        grade,
        count
      }));

      setTotalGradeData(gradeArr);
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
            <TotalDistribution gradeData={totalGradeData} />
            <GPATrend/>
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
