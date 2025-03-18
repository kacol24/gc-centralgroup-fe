'use client';

import {useEffect} from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

export default function AosProvider ({ children, duration = 400 }) {
    useEffect(() => {
        AOS.init({
            duration,
            once: false,
            startEvent: 'DOMContentLoaded',
        });
    }, []);

    return <>{children}</>;
}
