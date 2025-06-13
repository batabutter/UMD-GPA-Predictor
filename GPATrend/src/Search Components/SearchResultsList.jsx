import React from "react";
import "./SearchResultsList.css"
import { SearchResult } from "./SearchResult";

export function SearchResultsList( {results, setCourse} ) {
    return (
        <>
        <div className = "results-list">
            {
                results.map( (result, id) => {
                    return <SearchResult 
                    result={result} 
                    key={id} 
                    setCourse={setCourse}/>
                })
            }
        </div>
        </>
    )
}