import { Line } from "react-chartjs-2"
import { useEffect, useState } from 'react'

export function GPATrend({ courseName }) {

    const [yearlyGradeData, setYearlyGradeData] = useState([{}])

    useEffect(() => {
        fetch(`/course_grade_dis/${courseName}`)
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
      }, [courseName]);

    return (
        <>
            <div className="dataCard">
                <div>GPA Trend All-Time</div>
                <Line
                    data={{
                        labels: yearlyGradeData.map( item => item.semester),
                        datasets: [{
                            label: "Semester Average",
                            data: yearlyGradeData.map( item => item.average)
                        }]

                    }}

                />
            </div>
        </>
    )
}

function letter_grade_lookup(grade) {
        switch (grade) {
            case "A+":
                grade = 4
                break
            case "A":
                grade = 4
                break
            case "A-":
                grade = 3.7
                break;

            case "B+":
                grade = 3.3
                break
            case "B":
                grade = 3
                break
            case "B-":
                grade = 2.7
                break;

            case "C+":
                grade = 2.3
                break
            case "C":
                grade = 2
                break
            case "C-":
                grade = 1.7
                break;

            case "D+":
                grade = 1.3
                break
            case "D":
                grade = 1
                break
            case "D-":
                grade = 0.7
                break;

            case "F":
                grade = 0.0
                break;
        }

        return grade
    }

    export function compute_semester_average(semseter) {

        const cumulativeGrades = {};
        let num_students = 0.0
        let cum_total = 0.0
        let avg = 0.0

        Object.keys(semseter).forEach(key => {

            if (!["Other", "course", "professor", "section", "semester"].includes(key)) {
                if (!cumulativeGrades[key])
                    cumulativeGrades[key] = 0;
                cumulativeGrades[key] += (semseter[key] * letter_grade_lookup(key))
                num_students += semseter[key]
            }
        })

        Object.keys(cumulativeGrades).forEach(key => {
            if (!cumulativeGrades[key])
                cumulativeGrades[key] = 0;
            cum_total += cumulativeGrades[key]
        })
        avg = cum_total / num_students

        return avg
    }