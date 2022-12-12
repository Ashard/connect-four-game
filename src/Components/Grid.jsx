import React from "react";
import GridSpot from "./GridSpot";

function Grid() {
    // 6 rows, 7 each
    var gridSpotRows = [];
    var gridSpotsColumns = [];
    for (var i = 1; i < 7; i++) {
        gridSpotRows.push(i);
    }

    for (var j = 1; i < 8; i++) {
        gridSpotsColumns.push(j);
    }    

    return <div>
        {gridSpotRows.map((row)=> {
            gridSpotsColumns.map((column)=>{
                console.log(row, column);
                // console.log(column)
                // <GridSpot row={row} column={column}>
                // </GridSpot>   
            })
        })}       
    </div>
}

export default Grid;