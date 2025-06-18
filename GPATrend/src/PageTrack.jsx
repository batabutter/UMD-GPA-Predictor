import { useEffect, useState } from 'react'
import ReactGA from "react-ga4";
ReactGA.initialize("G-00BKDVCGF2");

export function PageTrack() {

    useEffect(() => {
        console.log("Viewing page")
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search,
        });
    }, []);

    return null
}