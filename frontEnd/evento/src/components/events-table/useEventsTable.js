import { useState } from "react";
import { checkPage } from "./eventsTableLogic";



export const useEventTable = () => {

    const [tHeader, setTHeader] = useState([]);
    const [tRow, setTrow] = useState([]);
    const [counter, setCounter] = useState(0)
    const [pages, setPages] = useState([]);


    const incrementCounter = () => {
        setCounter(counter + 1)
    }

    const decrementCounter = () => {
        setCounter(counter - 1)
    }

    const handleTable = async(pageType, tTitle, tData, i) => {

        const x = await checkPage(pageType, tTitle, tData, i);
        setTHeader(x.header);
        setTrow(x.row);
    }

    const handlePagination = (eventsCount) => {
        const t = eventsCount;
        const q = Math.floor(t / 10);
        const r = Math.floor(t % 10);
        const p = r !== 0 ? q + 1 : q;

        const pageList = Array.from(Array(p).keys())
        setPages(pageList)
    }


    return {
        tHeader,
        tRow,
        counter,
        // checkPage,
        incrementCounter,
        decrementCounter,
        setCounter,
        handlePagination,
        pages,
        handleTable
    }




}