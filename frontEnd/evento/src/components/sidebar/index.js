import React from "react";
import "./index.css";

import ListItem from "./list-item";

function SideBar(props) {

    const listItemContent = [...props.listContent];
    const listItemFn = [...props.listItemFn];

    return (
        <ul>{listItemContent.map((item, i) =>
            <ListItem clickItem={listItemFn[i]} itemName={item}/>
          
        )}

        </ul>
    )
}

export default SideBar;