import { useEffect, useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
import './App.css'
import { SectionDistribution } from "./SectionDist"
import { TotalDistribution } from './TotalDistribution';
import { GPATrend, compute_semester_average } from './GPATrend';
import { SearchBar } from './Searchbar';
import { SearchResultsList } from './SearchResultsList';

/*
TODO:
- Make search change data when shown
- Change componenets so that the useEffects are in each subsequent component
- Create a components folder
*/

function App() {
  const [data, setData] = useState([{}])
  const [sectionData, setSectionData] = useState([{}])
  const [totalGradeData, setTotalGradeData] = useState([{}])
  const [yearlyGradeData, setYearlyGradeData] = useState([{}])
  const [searchResults, setSearchResults] = useState([])

  // Start by fetching basic user data information
  useEffect(() => {
    fetch("/course_info/CMSC216")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })

  }, []);

  useEffect(() => {
    fetch("/course_grade_dis/CMSC216")
      .then(res => res.json())
      .then(data => {

        let formatted_year = ""
        let formatted_info = ""

        const grade_dis = data.map(item => {

          const info = {
            "A": 0, "A+": 0, "A-": 0,
            "B": 0, "B+": 0, "B-": 0,
            "C": 0, "C+": 0, "C-": 0,
            "D": 0, "D+": 0, "D-": 0,
            "F": 0, "Other": 0, "W": 0,
            "course": "", "professor": "",
            "section": "", "semester": "",
            "formatted_name": ""
          };

          formatted_year = item.semester.slice(0, 4)
          if (item.semester[item.semester.length - 1] == "1")
            formatted_year = "Fall " + formatted_year
          else
            formatted_year = "Spring " + formatted_year

          formatted_info = formatted_year + ", " + item.section
            + " - " + item.professor

          Object.keys(item).forEach(key => {
            info[key] = item[key]
            info["formatted_name"] = formatted_info
          })

          return info
        })

        setSectionData(grade_dis)
        console.log(grade_dis)
      });
  }, []);

  useEffect(() => {
    fetch("/course_grade_dis/CMSC216")
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

  useEffect(() => {
    fetch("/course_grade_dis/CMSC216")
      .then(res => res.json())
      .then(data => {
        // Create a map that store sinner maps containing 
        // the grade distributions for each semester
        const semester_grade_dis = {}
        const semester_avgs = {}
        let formatted_year = ""
        data.forEach(item => {

          formatted_year = item.semester.slice(0, 4)
          if (item.semester[item.semester.length - 1] == "1")
            formatted_year = "Fall " + formatted_year
          else
            formatted_year = "Spring " + formatted_year

          if (!semester_grade_dis[formatted_year])
            semester_grade_dis[formatted_year] = {}

          Object.keys(item).forEach(key => {
            if (!["Other", "course", "professor", "section", "semester"].includes(key)) {
              if (!semester_grade_dis[formatted_year][key])
                semester_grade_dis[formatted_year][key] = 0;
              semester_grade_dis[formatted_year][key] += item[key]
            }
          })

        })

        Object.keys(semester_grade_dis).forEach(semester => {
          let avg = compute_semester_average(semester_grade_dis[semester])
          semester_avgs[semester] = avg
        })

        const final_averages = Object.entries(semester_avgs).map(([semester, average]) => ({
          semester,
          average
        }));

        console.log(final_averages)

        setYearlyGradeData(final_averages)
      });
  }, []);

  return (
    <>
      <div className="App">
        <div className="header">
          <div className="courseInfo">
            CMSC 216
            <p className="subText">
              Average GPA: {Math.round(data.average_gpa * 100) / 100}
            </p>
            <p className="subText">
              Title: <i>{data.title}</i>
            </p>
          </div>

          <div className="searchBarContainer">
            <SearchBar setResults = {setSearchResults}/>
            <SearchResultsList results  = {searchResults}/>
          </div>

        </div>

        <div className="charts">
          <div className="chartsRow">
            <TotalDistribution gradeData={totalGradeData} />
            <GPATrend gradeData={yearlyGradeData} />
          </div>
          <div className="sectionDist">
            <SectionDistribution gradeData={sectionData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
