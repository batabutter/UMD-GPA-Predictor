import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"

export function TotalDistribution({ courseName }) {

    const [totalGradeData, setTotalGradeData] = useState([{}])

    useEffect(() => {
        fetch(`/total_course_grade_dis/${courseName}`)
            .then(setTotalGradeData([{}]))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTotalGradeData(data);
            });
    }, [courseName]);


    return (
        <>
            <div className="dataCard">
                <div>Grade Distribution All-Time</div>
                {totalGradeData.length > 0 && totalGradeData[0].count > 0 && (
                    <Bar
                    data={{
                        labels: totalGradeData.map(item => item.grade),
                        datasets: [
                            {
                                label: 'Number of Students',
                                data: totalGradeData.map(item => item.count),
                                backgroundColor: "rgba(255, 0, 0, 0.7)"
                            },
                        ],
                    }}
                />)}
            </div>
        </>
    )
}