const { useRef, useState, useEffect } = require("react");

function useWindowEvent(initialIsVisible) {
    const [isWindowVisible, setIsWindowVisible] = useState(
        initialIsVisible
    );
    const ref = useRef(null);


    const handleClickOutside = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = 'none';
    }


    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isWindowVisible, setIsWindowVisible };
}

export default useWindowEvent;