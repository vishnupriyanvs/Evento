import services from "../../constants";


export const checkPage = async(page, header, row, i) => {

    const contentFilter = (data, index) => data.length > (index + 1) * 10 ? data.slice(data.length - (index + 1) * 10, data.length - (index * 10)).reverse() : data.slice(0, data.length - (index * 10)).reverse();
    switch (page) {
        case services.eventType.ONGOING_EVENT:
            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            // setrow(row);
            // row = row.length > (i + 1) * 10 ? row.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            row = contentFilter(row, i);
            break;
        case services.eventType.UPCOMING_EVENT:
            header = header.filter((title, i) => {
                return title !== "End Date";
            });
            row = row.filter((content, i) => {
                return delete content["end_date"];
            });
        
            row = row.length > (i + 1) * 10 ? row.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            break;
        case services.eventType.CANCELED_EVENT:
            header = header.filter((title, i) => {
                return title !== "End Date";
            });
            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            row = row.filter((content, i) => {
                return delete content["end_date"];
            });
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            // setrow(row);
            row = row.length > (i + 1) * 10 ? row.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            break;
        case services.eventType.COMPLETED_EVENT:
            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            // setrow(row);
            row = row.length > (i + 1) * 10 ? row.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            break;

        default:
            console.log("Nothing Selected");
    }

    return {
        row,
        header
    }
}



