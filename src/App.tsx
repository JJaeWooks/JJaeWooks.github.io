import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from "./Page/mainPage";
import Quiz from "./Page/Quiz";
import mainPage from "./Page/mainPage";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react";
import ResultPage from "./Page/ResultPage";

export const App = observer(function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/result" element={<ResultPage/>}/>
            </Routes>
        </Router>
    );
});


export default App;
