import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, i) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                const x = document.querySelectorAll('.SelectnBtn1-options');
               if(x[i].style.display !== 'none')
                x[i].setAttribute('style', 'display:none; visibility: hidden;')
            }
        }

        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
}

export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.index);

    return <div ref={wrapperRef}>{props.children}</div>;
}