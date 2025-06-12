import React from "react";
import "./SearchResult.css"

export function SearchResult({ result }) {

    return (
        <>
            <div
                className="search-result"
                onClick={e => console.log(`You clicked on ${result.name}`)}>

                {result.name}
            </div>
        </>
    )
}