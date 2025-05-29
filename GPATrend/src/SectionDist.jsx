import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
import './App.css'

export function SectionDistribution ({ gradeData }) {

    return (
        <>
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
        </>
    )
}