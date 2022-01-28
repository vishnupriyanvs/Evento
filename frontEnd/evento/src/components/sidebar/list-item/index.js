import React from "react";
import "./index.css";

function ListItem(props){

    return(
                <li onClick={()=>props.ClickItem}>{props.itemName}</li>

    )
}

export default ListItem;