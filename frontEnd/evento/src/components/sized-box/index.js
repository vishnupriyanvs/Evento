import React from "react";

function SizedBox(props){

    let boxPadding = {
        "width": props.width,
        "height": props.height
    }

    return(
        <div style={boxPadding}></div>
    )
}

export default SizedBox;