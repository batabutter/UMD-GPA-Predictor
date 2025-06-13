import React from "react";
import "./SearchResult.css"

export function SearchResult({ result , setCourse, setUserInput, setResults}) {

    return (
        <>
            <div
                className="search-result"
                onClick={e => {
                    setCourse(result.name) 
                    setUserInput("")
                    setResults([])}}>
                {result.name}
            </div>
        </>
    )
}