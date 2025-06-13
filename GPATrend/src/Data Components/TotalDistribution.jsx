import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"

export function TotalDistribution({ courseName }) {

    const [totalGradeData, setTotalGradeData] = useState([{}])

    useEffect(() => {
        fetch(`/course_grade_dis/${courseName}`)
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
    }, [courseName]);


    return (
        <>
            <div className="dataCard">
                <div>Grade Distribution All-Time</div>
                <Bar
                    data={{
                        labels: totalGradeData.map(item => item.grade),
                        datasets: [
                            {
                                label: 'Number of Students',
                                data: totalGradeData.map(item => item.count),
                            },
                        ],
                    }}
                />
            </div>
        </>
    )
}