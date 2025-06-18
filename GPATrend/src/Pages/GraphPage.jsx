import { useEffect, useState } from 'react'
import '.././App.css'
import './Oritentation.css'
import '.././styles.css'
import { SectionDistribution } from ".././Data Components/SectionDist"
import { TotalDistribution } from '.././Data Components/TotalDistribution';
import { GPATrend} from '.././Data Components/GPATrend';
import { SearchBar } from '.././Search Components/Searchbar';
import { SearchResultsList } from '.././Search Components/SearchResultsList';
import { Blurb } from '.././Data Components/Blurb';
import { NavBar } from '../Search Components/NavBar';
import { PageTrack } from '../PageTrack'

export function GraphPage() {
    const [searchResults, setSearchResults] = useState([])
    // Default course
    const [currCourse, setCurrCourse] = useState("CMSC216")
    const [input, setInput] = useState("")

    PageTrack()

    return (
        <>
            <NavBar/>
            <div className="App">
                <div className="header">
                    <Blurb courseName={currCourse} />
                    <div className="searchBarContainer">
                        <SearchBar
                            setResults={setSearchResults}
                            userInput={input}
                            setUserInput={setInput} />
                        <SearchResultsList
                            results={searchResults}
                            setCourse={setCurrCourse}
                            setUserInput={setInput}
                            setResults={setSearchResults} />
                    </div>

                </div>

                <div className="charts">
                    <div className="chartsRow">
                        <TotalDistribution courseName={currCourse} />
                        <GPATrend courseName={currCourse} />
                    </div>
                    <div className="sectionDist">
                        <SectionDistribution courseName={currCourse} />
                    </div>
                </div>
            </div>
        </>
    )
}