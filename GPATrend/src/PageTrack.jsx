import { useEffect, useState } from 'react'

export function PageTrack() {

    console.log("Tracking view a page")

    useEffect(() => {
        if (window.gtag) {
            window.gtag("event", "page_view", {
                page_path: window.location.pathname + window.location.search,
            });
        }
    }, []);
}