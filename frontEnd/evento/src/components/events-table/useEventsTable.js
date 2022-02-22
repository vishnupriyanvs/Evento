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

    // const handleHeader = (pageType, tTitle, tData, i) => {
    //     console.log(checkPage(pageType, tTitle, tData, i))
    //     // debugger;
    //     setTHeader(checkPage(pageType, tTitle, tData, i).tHeader);
    // }
    // const checkPage = (page, tHeader, tRow, i) => {
    //     switch (page) {
    //       case services.eventType.ONGOING_EVENT:
    //         tHeader = tHeader.filter((title, i) => {
    //           return title !== "Actions";
    //         });
    //         setTHeader(tHeader);
    //         tRow = tRow.filter((content, i) => {
    //           return delete content["Actions"];
    //         });
    //         // setTrow(tRow);
    //         setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
    //         break;
    //       case services.eventType.UPCOMING_EVENT:
    //         tHeader = tHeader.filter((title, i) => {
    //           return title !== "End Date";
    //         });
    //         setTHeader(tHeader);
    //         debugger;

    //         tRow = tRow.filter((content, i) => {
    //           return delete content["end_date"];
    //         });
    //         // setTrow(tRow);
    //         setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
    //         break;
    //       case services.eventType.CANCELED_EVENT:
    //         tHeader = tHeader.filter((title, i) => {
    //           return title !== "End Date";
    //         });
    //         tHeader = tHeader.filter((title, i) => {
    //           return title !== "Actions";
    //         });
    //         setTHeader(tHeader);
    //         tRow = tRow.filter((content, i) => {
    //           return delete content["end_date"];
    //         });
    //         tRow = tRow.filter((content, i) => {
    //           return delete content["Actions"];
    //         });
    //         // setTrow(tRow);
    //         setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse())
    //         break;
    //       case services.eventType.COMPLETED_EVENT:
    //         tHeader = tHeader.filter((title, i) => {
    //           return title !== "Actions";
    //         });
    //         setTHeader(tHeader);
    //         tRow = tRow.filter((content, i) => {
    //           return delete content["Actions"];
    //         });
    //         // setTrow(tRow);
    //         setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
    //         break; 

    //       default:
    //         console.log("Nothing Selected");
    //     }
    // }

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