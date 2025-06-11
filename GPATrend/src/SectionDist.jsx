import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import './styles.css'
import './App.css'
import { useEffect, useState } from 'react'

export function SectionDistribution({ gradeData }) {

    const [sectionData, setSectionData] = useState([{}])
    const [currSectionDis, setCurrSectionDis] = useState([{}])

    useEffect(() => {
        fetch("/course_grade_dis")
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
                set_section_grade_dis(0, grade_dis)
            });
    }, []);

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
        console.log(infoArray)
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