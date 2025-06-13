import { useEffect, useState } from 'react'
import './styles.css'
import './App.css'
import { SectionDistribution } from "./Data Components/SectionDist"
import { TotalDistribution } from './Data Components/TotalDistribution';
import { GPATrend, compute_semester_average } from './Data Components/GPATrend';
import { SearchBar } from './Search Components/Searchbar';
import { SearchResultsList } from './Search Components/SearchResultsList';
import { Blurb } from './Data Components/Blurb';

/*
TODO:
- Make webpage run a lot faster
- Fix null errors when trying to render parts of a json that don't exist
- Add about section
- Change colors of graphs to make them more visually appealing
*/

function App() {
  const [searchResults, setSearchResults] = useState([])
  // Default course
  const [currCourse, setCurrCourse] = useState("CMSC216")
  const [input, setInput] = useState("")

  return (
    <>
      <div className="App">
        <div className="header">
          <Blurb courseName = {currCourse}/>
          <div className="searchBarContainer">
            <SearchBar 
            setResults = {setSearchResults}
            userInput={input}
            setUserInput={setInput}/>
            <SearchResultsList 
            results={searchResults} 
            setCourse={setCurrCourse}
            setUserInput={setInput}
            setResults={setSearchResults}/>
          </div>

        </div>

        <div className="charts">
          <div className="chartsRow">
            <TotalDistribution courseName={currCourse}/>
            <GPATrend courseName={currCourse}/>
          </div>
          <div className="sectionDist">
            <SectionDistribution courseName={currCourse}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
