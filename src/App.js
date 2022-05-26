import * as React from 'react';
import './App.css';
import DataTable from './components/DataTable';
import BarChart from './components/BarChart';
import Field from './components/Field';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

function App() {


  return (
    <div >

      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/data-table" element={<DataTable />} />
        <Route path="/bar-chart" element={<BarChart />} />
        <Route path="/field" element={<Field />} />

      </Routes>

    </div>
  );

}
export default App;
