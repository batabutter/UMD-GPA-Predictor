import React, {useState} from "react";

import "./SearchBar.css"
import {FaSearch} from "react-icons/fa"

export function SearchBar ( {setResults, userInput, setUserInput} ) {

    const fetchResults = (courseName) => {
        fetch(`/course_search/${courseName}`)
        .then(res => res.json())
        .then(json => {
            const results = json.filter((item) => item.type==='course')
            setResults(results)
        })
    }

    const handleInput = (input) => {
        setUserInput(input)

        if (input.length > 0) {
            fetchResults(input)
        } else {
            setResults([])
        }
    }

    return (
        <>
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input placeholder="Type to search..." 
            value = {userInput} 
            onChange = {(e) => {handleInput(e.target.value)}}/>
        </div>
        </>
    )

} 