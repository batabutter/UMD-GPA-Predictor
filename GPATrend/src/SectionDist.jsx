import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
import './App.css'
import { useEffect, useState } from 'react'

export function SectionDistribution({ gradeData }) {
    const [currSectionDis, setCurrSectionDis] = useState([{}])

    useEffect(() => {
      set_section_grade_dis(0, gradeData);
    }, [gradeData]);

    function set_section_grade_dis(index, data) {

        const raw = data[index];

        const gradeKeys = Object.keys(raw).filter(
            key => !["course", "professor", "section", "semester", 
                "formatted_name"].includes(key)
        );

        const gradeArray = gradeKeys.map(grade => ({
            grade,
            count: raw[grade],
        }));

        setCurrSectionDis(gradeArray);
    }

    return (
        <>
            <div className="dataCard">
                <div>Grade Distribution by Section</div>

                <select onChange={(e) => set_section_grade_dis(e.target.selectedIndex, gradeData)}>
                    {gradeData.map((item, index) => (
                        <option key={index} value={item.formatted_name}>
                            {item.formatted_name}
                        </option>
                    ))}
                </select>

                <Bar
                    data={{
                        labels: currSectionDis.map(item => item.grade),
                        datasets: [
                            {
                                label: "Number of Students",
                                data: currSectionDis.map(item => item.count)
                            },
                        ],
                    }}>
                </Bar>

            </div>
        </>
    )
}