import { NavBar } from '../Search Components/NavBar';
import ".././About.css"

export function About() {

    PageTrack()

    return (
        <>
            <NavBar />
            <div className='About'>
                <div className="info">
                    <b>About Page:</b>

                    <div className='subText'>
                        This application was made to have a
                        more streamlined and user-friendly way of viewing the
                        grade information for courses at The University of Maryland
                    </div>

                    <div className='subText'>
                        Grade data obtained via the <a href="https://planetterp.com/api/">PlanetTerpAPI</a>
                    </div>

                    <div className='subText'>
                        Concept inspired by <a href="https://vagrades.com/">VAGrades</a>
                    </div>

                    <div className='subText'>
                        The code to this webpage can
                        be found <a href="https://github.com/batabutter/UMD-GPA-Predictor/tree/main"> here </a>
                    </div>

                    <div className='subText'>
                        If you have any suggestions,
                        bug fixes, or anything you may want see improved, please
                        feel free to email me at <a href="mailto:umdgradetrends@gmail.com">umdgradetrends@gmail.com</a>
                    </div>

                </div>
            </div>
        </>
    )
}