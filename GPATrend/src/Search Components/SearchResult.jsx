import React from "react";
import "./SearchResult.css"

export function SearchResult({ result , setCourse}) {

    return (
        <>
            <div
                className="search-result"
                onClick={e => setCourse(result.name)}>

                {result.name}
            </div>
        </>
    )
}