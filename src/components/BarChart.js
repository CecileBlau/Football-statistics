import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import datajs from './datajs';
import Chart from "react-apexcharts";
import '../App.css';

function BarChart(props) {
    const data = datajs.datajs
    const titles = data[5]
    var justPlayers = [];
    var justPlayersNames = [];
    const meaningArray = datajs.meaning
    var scoresOfEachPlayerOnAnArr = []
    const [yAxis, setYAxis] = useState('Min');
    const [initial, setInitial] = useState(['90', '0', '90', '60', '30', '75', '15', '90', '80', '10', '30', '60', '90', '90', '0', '90', '70', '0', '20', '0']);
    const [subtitle, setSubtitle] = useState('Minutes Played By Athlete');

    var sum = 0;

    //justPlayers: This creates an array of objects instead of an array of array.
    // For example  each athlete will be a single object:
    // Athlete: "261 Ignatius Rangel"
    // Att: "0/0-0%"
    // Bck: "0".
    //It splices the first 6 rows that arent needed 
    for (var i = 0; i < data.length; i++) {
        var obj = {};
        for (var j = 0; j < titles.length; j++) {
            obj[titles[j]] = data[i][j];
        }
        justPlayers.push(obj);
    }
    justPlayers.splice(0, 6)


    //This creates an array with the athlets name as items.
    //This will be used to crate the X-Axis of the Bar Chart
    {
        justPlayers.map((item, i) => {
            justPlayersNames.push(item.Athlete)
        })
    }


    //handleChange is a function that comes from the dropdown of dashboard button.
    //when you clic an option, the BarChart will change its Y-axis.
    // Could be "Min", "T", "CK", "FK", etc.
    const handleChange = (key, i) => {
        setYAxis(key)

        //subtitle is whats shown as a subtitle of the bar chart
        // it gives the real meaning of Min, T, CK, Att etc
        setSubtitle(meaningArray[i])

        scoresOfEachPlayerOnAnArr = justPlayers.map((item, i) => {
            // console.log(item[key])
            return item[key]

        })
        //initial is an array with the results of each player.
        //Depending on the Y-axis posibilities (Min, T, CK, etc)
        // [90, 40, 60 ... etc] 
        // 90 will represent the score for the player on index 0 (Raul Castillo)
        // 40 will represent the score for the player on index 1 (Jorge Sanchez)
        setInitial(scoresOfEachPlayerOnAnArr)


    }

    
    // Converts the item numbers from strings to numbers
    // So it is posible to sum and divide for the average score of the team
    // Depending on the Y-Axis selected (Min, T, Total, etc)
    const arrOfNum = initial.map(str => {

        return Number(str);
    });

    //Function that returns the average of the team
    // arrOfNum comes from 'initial' 
    function sumArray() {
        for (let i = 0; i < arrOfNum.length; i += 1) {
            sum += arrOfNum[i] / 20;

        }

        return sum;


    }

    sumArray()


    //Options are the Y-axis information (Min, T, CK, etc).
    //The Library used (apexcharts) uses the name 'options'
    const options = {
        annotations: {
            yaxis: [
                {
                    //Sets the average to 2 decimals only
                    y: sum.toFixed(2),
                    borderColor: "gray",
                    label: {
                        borderColor: "gray",
                        style: {
                            color: "white",
                            background: "gray"
                        },
                        //Since some results are no posible to get the average,
                        // its set to display "Not available"
                        // for example "Total" (total posession time by team)
                        text: `Average: ${isNaN(sum.toFixed(2)) ? "Not available" : sum.toFixed(2)}`
                    }
                }
            ]
        },
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: justPlayersNames
        },

        title: {
            text: 'Team Puebla F.C. ',
            align: 'center',
            floating: true,
            style: {
                color: 'black',
            },

        },
        subtitle: {
            text: subtitle,
            align: 'center',
        },
        colors: ['#00E396'],
        yaxis: {
            show: true,
        },


    }
    //Series are the x axis information
    //Meaning the name of all players
    const series = [
        {
            name: yAxis,
            data: initial,

        }
    ]


    return (
        <div className='barChartWrap' style={{ display: 'flex' }}>
            <div style={{ marginLeft: '20px' }}>

                {/* Dropdown Dashboard from MUI */}
                
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)} style={{ backgroundColor: 'black', marginTop: '40px' }}>
                                Dashboard
                            </Button>
                            <Menu {...bindMenu(popupState)}>

                                {/* Since "Athlete" and "Started" are not needed, they wont be displayed */}
                                {titles.map((item, i) => {
                                    if (item === "Athlete" || item === "Started") {
                                        console.log('nothing')
                                    } else {
                                        return <MenuItem onClick={() => handleChange(item, i)}>{item}</MenuItem>
                                    }


                                })}

                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>


            <div style={{ marginLeft: '80px', marginTop: "40px" }}>
                {/* Bar Chart from Apexcharts */}
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="900"
                    maxItems='29'
                />
            </div>


        </div>
    );
}

export default BarChart;