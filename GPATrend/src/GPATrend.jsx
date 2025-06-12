import { Line } from "react-chartjs-2"
import { useEffect, useState } from 'react'

export function GPATrend({ gradeData }) {

    return (
        <>
            <div className="dataCard">
                <div>GPA Trend All-Time</div>
                <Line
                    data={{
                        labels: gradeData.map( item => item.semester),
                        datasets: [{
                            label: "Semester Average",
                            data: gradeData.map( item => item.average)
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