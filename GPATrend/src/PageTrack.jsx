import { useEffect, useState } from 'react'

export function PageTrack() {
    useEffect(() => {
        if (window.gtag) {
            window.gtag("event", "page_view", {
                page_path: window.location.pathname + window.location.search,
            });
        }
    }, []);
}