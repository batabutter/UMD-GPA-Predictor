import { Bar } from "react-chartjs-2"

export function TotalDistribution({ gradeData }) {
    return (
        <>
            <div className="dataCard">
                <div>Grade Distribution All-Time</div>
                <Bar
                    data={{
                        labels: gradeData.map(item => item.grade),
                        datasets: [
                            {
                                label: 'Number of Students',
                                data: gradeData.map(item => item.count),
                            },
                        ],
                    }}
                />
            </div>
        </>
    )
}