 import Link from '@material-ui/core/Link'
import React from "react";
import Typography from "@material-ui/core/Typography";
import Titlize from "../commons/genricComponents/titlize"
//genric table fields for player list
export const playerList =
    [
        { field: "slNo", title: "SL No" },
        {
            field: "userName",
            title: "Name",

            render: (rowData) => (
                <Typography component="div">
                    <Link
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                            this.props.handleDetailDisplay(
                                rowData.userId,
                                
                                rowData.userName
                            )
                        }
                    >
                        <Titlize value={rowData.userName.trim()} />
                    </Link>
                </Typography>
            ),
            cellStyle: {
                width: "50%",

            },
        },
        {
            field: "academy", title: "Academy", cellStyle: {
                width: "50%",

            },
        },
        {
            field: "city", title: "City", cellStyle: {
                width: "50%",

            },
        },
        {
            field: "stateName", title: "State", cellStyle: {
                width: "50%",

            },
        },
        {
            field: "rank", title: "Rank", cellStyle: {
                width: "50%",

            }
        },
        {
            field: "totPoints", title: "Point", cellStyle: {
                width: "50%",

            }
        },
    ]
