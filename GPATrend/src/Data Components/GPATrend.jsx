import { Line } from "react-chartjs-2"
import { useEffect, useState } from 'react'

export function GPATrend({ courseName }) {

    const [yearlyGradeData, setYearlyGradeData] = useState([{}])

    useEffect(() => {
        fetch(`/course_gpa_trend/${courseName}`)
          .then(res => res.json())
          .then(data => {
            setYearlyGradeData(data)
            console.log(data)
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