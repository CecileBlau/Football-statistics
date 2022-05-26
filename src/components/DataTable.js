import React from 'react';
import datajs from './datajs';
import { Table } from 'antd'
import 'antd/dist/antd.css';
import '../App.css';

function DataTable(props) {
    const data = datajs.datajs
    const titles = data[5]
    const meaningArray = datajs.meaning

    //justPlayers: This creates an array of objects instead of an array of array.
    // For example  each athlete will be a single object:
    // Athlete: "261 Ignatius Rangel"
    // Att: "0/0-0%"
    // Bck: "0".
    //It splices the rows that are not needed
    var resultArray = [];
    for (var i = 0; i < data.length; i++) {
        var obj = {};
        for (var j = 0; j < titles.length; j++) {
            obj[titles[j]] = data[i][j];
        }
        resultArray.push(obj);
    }
    const removedArrayFirst = resultArray.splice(0, 4)
    const removedSecond = resultArray.splice(1, 1)
    const dataSource = resultArray


    //To make a table with Ant Desings, it requires to set two variables:
    //1) dataSource and 2) columns.
    //Both of them need to be an array of objects.
    //dataSource would have to look like this:
    // [{
    // Athlete: "195 Jesus Garcia",
    // Att: "3/4-75%",
    // Bck: "5",
    // CK: "0",
    // }  ... etc ,  

    //"columns" have to be an array of objets in which their keys have to be:
    //{
    //   title: ,
    //   dataIndex: 
    // },

    //In order to acomodate this requirement: a variable named "titlesColumns" is set
    // with the items "title" and "dataIndex" inside an array
    const titlesColumns = ['title', 'dataIndex']

    //This for loop creates an array with objects in which their
    //keys are "title" and "dataIndex", and their values will be
    //the titles (SH,CK,FK, etc)
    var resultArrayForColumns = [];
    for (var g = 0; g < titles.length; g++) {
        var objTwo = {};
        for (var k = 0; k < titlesColumns.length; k++) {
            
            objTwo[titlesColumns[k]] = titles[g];
        }
        resultArrayForColumns.push(objTwo);


    }






    //To display the data in the table centered and not to the right,
    //Needs to be added an object with the key/values {align:"center"}
    //to each individual item of the array
    const columns = resultArrayForColumns.map(v => ({ ...v, align: 'center' }))


    //In order to keep the first column with the name of the players fixed
    //So its easier to read the information of each player
    columns[0].fixed = "left"
    
    //The slice method will erease the first numbers written on each players name
    columns[0].render= (text) => <p><b>{text.slice(3)}</b></p>


    //This allows you to filter which players on the team played the match
    columns[1].filters =
        [{
            text: 'Who played this match',
            value: 'X',

        },
        {
            text: 'Who didnt play this match',
            value: '',

        },
        ]

    columns[1].onFilter = (value, record) => { return record.Started === value }


    

    //Sort the columns in ascending and descending order
    columns[2].sorter = (a, b) => a.Min - b.Min
    columns[2].sortDirections = ['descend', 'ascend']

    columns[3].sorter = (a, b) => a.T - b.T
    columns[3].sortDirections = ['descend', 'ascend']

    



    return (


        <div >
            <h2 style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>Puebla FC player's statistics after match with  FC Juarez on January 2022</h2>
            <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={true}
                    size="small"
                    bordered
                    title={() => 'Team Puebla F.C. '}
                    scroll={{
                        x: 3000,
                        y: 500,

                    }}
                    style={{ margin: '30px' }}



                >

                </Table>
            </div>


        </div>


    );
}

export default DataTable;