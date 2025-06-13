import { useEffect, useState } from 'react'

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
                <p className="subText">
                    Average GPA: {Math.round(data.average_gpa * 100) / 100}
                </p>
                <p className="subText">
                    Title: <i>{data.title}</i>
                </p>
            </div>
        </>
    )
}