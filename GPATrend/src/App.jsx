import { useEffect, useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
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
- Make search change data when shown
- Change componenets so that the useEffects are in each subsequent component
*/

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [currCourse, setCurrCourse] = useState("CMSC216")

  return (
    <>
      <div className="App">
        <div className="header">
          <Blurb courseName = {currCourse}/>
          <div className="searchBarContainer">
            <SearchBar setResults = {setSearchResults}/>
            <SearchResultsList 
            results={searchResults} 
            setCourse={setCurrCourse}/>
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
