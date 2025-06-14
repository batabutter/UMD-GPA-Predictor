import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import "./Data.css"
import { useEffect, useState } from 'react'

export function SectionDistribution({ courseName }) {
    const [sectionData, setSectionData] = useState([{}])
    const [currSectionDis, setCurrSectionDis] = useState([{}])

    useEffect(() => {
        fetch(`/total_section_distribution/${courseName}`)
          .then(setSectionData([{}]))
          .then(res => res.json())
          .then(data => {
            setSectionData(data)
            console.log(data)
          });
    }, [courseName]);

    useEffect(() => {
      set_section_grade_dis(0, sectionData);
    }, [sectionData]);

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

                <select onChange={(e) => set_section_grade_dis(e.target.selectedIndex, sectionData)}>
                    {sectionData.map((item, index) => (
                        <option key={index} value={item.formatted_name}>
                            {item.formatted_name}
                        </option>
                    ))}
                </select>

                { currSectionDis.length > 0 && (
                  <Bar
                    data={{
                        labels: currSectionDis.map(item => item.grade),
                        datasets: [
                            {
                                label: "Number of Students",
                                data: currSectionDis.map(item => item.count),
                                backgroundColor: "rgba(255, 0, 0, 0.7)",
                                borderColor: "red",
                            },
                        ],
                    }}>
                </Bar>
                )}

            </div>
        </>
    )
}