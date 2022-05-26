import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../App.css';
import DataField from './DataField';
import Button from '@mui/material/Button';



function Field(props) {
    const data = DataField
    const [clicked, setClicked] = useState(false);
    const arrayArea1 = []
    const arrayArea2 = []
    const arrayArea3 = []

    //Area 1 Goal area:
    // Y axis it between  200 and 300
    // X axis is between  0 and 30

    //Area 2 Penalty area:
    // Y axis it between  130 and 346
    // X axis is between  30 and 90


    //This percentage function maps through the data (attempted goals)
    // and classifies the attempted goal into 3 differents arrays
    // depending on their location (X-axis and Y-axis of the field)
    //This will be shown on the small table below the field
    const percentage = () => {
        data.map((item) => {
            if (200 <= item.y && item.y <= 300 && item.x <= 30) {
                arrayArea1.push(item)
            }

            else if (130 <= item.y && item.y <= 346 && item.x <= 90) {
                arrayArea2.push(item)

            } else {
                arrayArea3.push(item)
            }
        })

    }
    percentage()
    console.log(arrayArea1)

    //This function is part of the MUI library for the creation of the table
    function createData(area, attempted, porcentage, player) {
        return { area, attempted, porcentage, player };
    }

    //To show which player did the attempted goal
    const playerArea1 =
        arrayArea1.map((item, i) => {
            return item.player
        })
    const playerArea2 =
        arrayArea2.map((item, i) => {
            return item.player
        })
    const playerArea3 =
        arrayArea3.map((item, i) => {
            return item.player

        })






    const columns2 = [
        {
            field: 'id',
            headerName: 'Area',
            width: 140,
            // headerAlign: 'center',

        },

        {
            field: 'attemptedgoals',
            headerName: 'Attempted goals',
            width: 140,
            type: 'number',
            // headerAlign: 'center',
        },

        {
            field: 'percentage2',
            headerName: 'Percentage',
            width: 140,
            // headerAlign: 'center',
        },
        {
            field: 'players2',
            headerName: 'Players',
            width: 290,
            // headerAlign: 'center',
        },

    ];

    const rows2 = [
        {
            id: 'Goal area',
            attemptedgoals: `${arrayArea1.length}`,
            percentage2: `${(arrayArea1.length * 100 / data.length).toFixed(2)}%`,
            players2: playerArea1
        },
        { id: 'Penalty area', attemptedgoals: `${arrayArea2.length}`, percentage2: `${(arrayArea2.length * 100 / data.length).toFixed(2)}%`, players2: playerArea2, align: 'center' },
        { id: 'Half way area', attemptedgoals: `${arrayArea3.length}`, percentage2: `${(arrayArea3.length * 100 / data.length).toFixed(2)}%`, players2: playerArea3, align: 'center' },
        { id: 'Total', attemptedgoals: data.length, percentage2: '100%', align: 'center' },


    ];
    return (
        <div className='fieldWrap'>
            {/* This button will allow you to toggle to see which player attemped each goal */}
            <Button onClick={() => { setClicked(!clicked) }} variant="contained" style={{ backgroundColor: 'black', marginTop: '30px', marginLeft: '15px' }}>
                {clicked ? <span>Delete Players</span> : <span>Show Players</span>}
            </Button>

            {/* Football field made with HTML and CSS */}
            <h2> Puebla FC attempted goals</h2>
            <div class="container">
                <div className="line"></div>
                <div className="half"></div>
                <div className="panelty left"></div>
                <div className="panelty right"></div>
                <div className="p-spot left"></div>
                <div className="p-spot right"></div>
                <div className="center"></div>
                <div className="p-place left"></div>
                <div className="p-place right"> </div>

                {/* This map function sets each item (attemped goal) visualy on the field
                thanks to its values of x and y.
                Its dinamic, if the json data gets added, changed or deleted info, it
                will be shown on the field */}
                {data.map((item) => {
                    return <div className='attemptedGoalDot' style={{ right: `${item.x}px`, top: `${item.y}px` }}>
                        {clicked ? <p>{item.player}</p> : null}
                    </div>
                })}

            </div>

            {/* Table from MUI that displays the data dinamicly.
                Shows in which area the attempted goal was taken,
                numbers and percentage of it depending on its area */}
            <h2>Attempted goals table</h2>
            <div style={{ display: 'flex', justifyContent: 'center', width: '900px', margin: '30px', marginLeft: '150px' }}>

                <div style={{ height: 380, width: '100%' }}>
                
               
                    <DataGrid
                        rows={rows2}
                        rowHeight={60}
                        columns={columns2}
                        pageSize={4}
                        rowsPerPageOptions={[4]}
                        checkboxSelection
                        style={{ marginLeft:"70px", backgroundColor:"rgb(237,237,237, 0.6)" }}
                        sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 2,

                        }}

                    />
                </div>
            </div>

        </div>
    );
}

export default Field;