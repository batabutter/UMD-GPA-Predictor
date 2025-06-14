import { useEffect, useState } from 'react'
import './Data.css'

export function Blurb( {courseName} ) {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch(`/course_info/${courseName}`)
          .then(res => res.json())
          .then(data => {
            setData(data)
          })
    
      }, [courseName]);

    return (
        <>
            <div className="courseInfo">
                {courseName}
                <div className="subText">
                    Average GPA: {Math.round(data.average_gpa * 100) / 100}
                </div>
                <div className="subText">
                    Title: <i>{data.title}</i>
                </div>
            </div>
        </>
    )
}