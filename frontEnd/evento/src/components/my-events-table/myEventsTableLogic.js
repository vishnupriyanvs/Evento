import services from "../../constants";

export const checkPage = (page, header, row, i) => {
    const contentFilter = (data, index) => data.length > (index + 1) * 10 ? data.slice(data.length - (index + 1) * 10, data.length - (index * 10)).reverse() : data.slice(0, data.length - (index * 10)).reverse();

    switch (page) {
        case services.myEventType.UPCOMING_EVENT.INVITED_EVENT:
            // header = header.filter((title, i) => {
            //   return title !== "End Date";
            // });

            // setheader(header);

            // row = row.filter((content, i) => {
            //   return delete content["end_date"];
            // });
            row = contentFilter(row, i);

            break;

        case services.myEventType.UPCOMING_EVENT.ACCEPTED_EVENT:

            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            // setheader(header);
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            row = contentFilter(row, i);
            // setrow(row);
            break;

        case services.myEventType.UPCOMING_EVENT.REJECTED_EVENT:

            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            // setheader(header);
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            // row = row.length > (i + 1) * 10 ? row.length.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            // setrow(row);
            row = contentFilter(row, i);
            break;

        case services.myEventType.COMPLETED_EVENT.ACCEPTED_EVENT:

            // setheader(header);
            // row = row.length > (i + 1) * 10 ? row.length.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            // setrow(row);
            row = contentFilter(row, i);
            break;

        case services.myEventType.COMPLETED_EVENT.REJECTED_EVENT:

            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            // setheader(header);
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            row = row.length > (i + 1) * 10 ? row.length.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            // setrow(row);
            row = contentFilter(row, i);
            break;

        case services.myEventType.CANCELLED_EVENT:

            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            header = header.filter((title, i) => {
                return title !== "End Date";
            });
            // setheader(header);
            row = row.filter((content, i) => {
                return delete content.event["endDate"];
            });
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            // row = row.length > (i + 1) * 10 ? row.length.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            // setrow(row);
            row = contentFilter(row, i);

            break;

        case services.myEventType.ONGOING_EVENT:

            header = header.filter((title, i) => {
                return title !== "Actions";
            });
            // setheader(header);
            row = row.filter((content, i) => {
                return delete content["Actions"];
            });
            // row = row.length > (i + 1) * 10 ? row.length.slice(row.length - (i + 1) * 10, row.length - (i * 10)).reverse() : row.slice(0, row.length - (i * 10)).reverse();
            // setrow(row);
            row = contentFilter(row, i);
            break;
        default:
            console.log("Nothing Selected");
    }
    return {
        row,
        header
    }
};