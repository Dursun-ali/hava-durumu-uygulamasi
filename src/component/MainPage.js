import React, { useState, useEffect } from 'react';
import '../css/MainPage.css'
import PlaceIcon from '@mui/icons-material/Place';
import axios from 'axios';
import CityData from './CityData';
import AirIcon from '@mui/icons-material/Air';
import ExploreIcon from '@mui/icons-material/Explore';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompressIcon from '@mui/icons-material/Compress';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const MainPage = () => {
    const [array, setArray] = useState();
    const [value, setValue] = useState("trabzon")
    const [isLoading, setIsLoading] = useState(true);
    const [warning, setWarning] = useState(false);
    const [show, setShow] = useState(false)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const APP_KEY = "d923ae6770a14f9494d95349232003";
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const [city, setCity] = useState("Trabzon")
    const [long, setLong] = useState()
    const [date, setDate] = useState()

    var tarih = new Date();

    const [deneme, setDeneme] = useState([10, 20, 15, 35, 25])
    const data = [
        {
            name:`${((date + 2 - 24 < 10 && date + 2 - 24 >= 0) || (date < 10))? "0":""}${date + 2 >= 24 ? date + 2 - 24 : date + 2}:00`  ,
            uv: array?.forecast.forecastday[0]?.hour[`${date + 2 >= 24 ? date + 2 - 24 : date + 2}`].temp_c,
        },
        {
            name: `${((date + 4 - 24 < 10 && date + 4 - 24 >= 0) || (date < 10))? "0":""}${date + 4 >= 24 ? date + 4 - 24 : date + 4}:00`,
            uv:array?.forecast.forecastday[0]?.hour[`${date + 4 >= 24 ? date + 4 - 24 : date + 4}`].temp_c,
        },
        {
            name: `${((date + 6 - 24 < 10 && date + 6 - 24 >= 0) || (date < 10))? "0":""}${date + 6 >= 24 ? date + 6 - 24 : date + 6}:00`,
            uv:array?.forecast.forecastday[0]?.hour[`${date + 6 >= 24 ? date + 6 - 24 : date + 6}`].temp_c,
        },
        {
            name: `${((date + 8 - 24 < 10 && date + 8 - 24 >= 0) || (date < 10))? "0":""}${date + 8 >= 24 ? date + 8 - 24 : date + 8}:00`,
            uv:array?.forecast.forecastday[0]?.hour[`${date + 8 >= 24 ? date + 8 - 24 : date + 8}`].temp_c,
        },
        {
            name:`${((date + 10 - 24 < 10 && date + 10 - 24 >= 0) || (date < 10))? "0":""}${date + 10 >= 24 ? date + 10 - 24 : date + 10}:00`,
            uv:array?.forecast.forecastday[0]?.hour[`${date + 10 >= 24 ? date + 10 - 24 : date + 10}`].temp_c,
        },
        {
            name:`${((date + 12 - 24 < 12 && date + 12 - 24 >= 0) || (date < 10))? "0":""}${date + 12 >= 24 ? date + 12 - 24 : date + 12}:00`,
            uv:array?.forecast.forecastday[0]?.hour[`${date + 12 >= 24 ? date + 12 - 24 : date + 12}`].temp_c,
        },
        {
            name:`${((date + 14 - 24 < 10 && date + 14 - 24 >= 0) || (date < 10))? "0":""}${date + 14 >= 24 ? date + 14 - 24 : date + 14}:00`,
            uv:array?.forecast.forecastday[0]?.hour[`${date + 14 >= 24 ? date + 14 - 24 : date + 14}`].temp_c,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=Trabzon&days=7&aqi=no&alerts=no`);
                setArray(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setWarning(true)
                setIsLoading(false);
            }
        };
        fetchData();
        setDate(tarih.getHours())
    }, []);
    console.log(date);

    function inpWrite(e) {
        setCity(document.getElementsByClassName('data-div')[e.target.id].textContent)
        setShow(false);
        setIsLoading(true);
        const response = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${e.target.id}&days=7&aqi=no&alerts=no`);
        response.then(response => {
            setArray(response.data);
            setIsLoading(false);
            setWarning(false);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            setWarning(true);
            setIsLoading(false);
        });
    }

    function searchFunction(e) {
        setLong(e.target.value.length)
        setValue(e.target.value);
        setShow(true);
        const searchValue = searchInput.value;
        suggestionsList.innerHTML = '';
        const filteredData = CityData.filter(item => {
            const cityName = item.cityName.name;
            return cityName.toLocaleLowerCase('tr-TR').startsWith(searchValue.toLocaleLowerCase('tr-TR'))
                || cityName.toLocaleUpperCase('tr-TR').startsWith(searchValue.toLocaleUpperCase('tr-TR'));
        });
        filteredData.forEach((item) => {
            const listItem = document.createElement('div');
            listItem.classList.add("data-div");
            listItem.textContent = item.cityName.name;
            listItem.addEventListener('click', function () {
                searchInput.value = item.cityName.name;
            });
            listItem.id = item.cityData;
            suggestionsList.appendChild(listItem);
        });
    }

    return (
        <>
            <div className="main-container">
            <div style={isLoading ? { backgroundColor: "#F7F7F7" } : { display: "none" }} className='loading-wrapper'>
                        <div style={isLoading ? { display: "block" } : { display: "none" }}>
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                <div className="weather-container">
                    <div style={{ height: "100vh" }} className="row">
                        <div  className="col-lg-3 color">
                            <div className='right-container'>
                                <div className='weather-img-container'>
                                    <img src={array?.current.condition.icon} alt="" />
                                    <div>
                                        <div className='first-write'>{array?.current.temp_c} ℃</div>
                                        <div className='third-write' >
                                            {array?.current.condition.text}
                                        </div>
                                    </div>
                                </div>
                                <div className='rain-table-wrapper'>
                                    <div className='rain-table-title'>
                                        Change of rain
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 2 - 24 < 10 && date + 2 - 24 >= 0) || (date < 10)) && "0"}{date + 2 >= 24 ? date + 2 - 24 : date + 2}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 2 >= 24 ? date + 2 - 24 : date + 2}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[0].humidity}%
                                        </div>
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 4 - 24 < 10 && date + 4 - 24 >= 0) || (date < 10)) && "0"}{date + 4 >= 24 ? date + 4 - 24 : date + 4}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 4 >= 24 ? date + 4 - 24 : date + 4}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[1].humidity}%
                                        </div>
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 6 - 24 < 10 && date + 6 - 24 >= 0) || (date < 10)) && "0"}{date + 6 >= 24 ? date + 6 - 24 : date + 6}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 6 >= 24 ? date + 6 - 24 : date + 6}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[2].humidity}%
                                        </div>
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 8 - 24 < 10 && date + 8 - 24 >= 0) || (date < 10)) && "0"}{date + 8 >= 24 ? date + 8 - 24 : date + 8}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 8 >= 24 ? date + 8 - 24 : date + 8}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[3].humidity}%
                                        </div>
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 10 - 24 < 10 && date + 10 - 24 >= 0) || (date < 10)) && "0"}{date + 10 >= 24 ? date + 10 - 24 : date + 10}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 10 >= 24 ? date + 10 - 24 : date + 10}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[4].humidity}%

                                        </div>
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 12 - 24 < 10 && date + 12 - 24 >= 0) || (date < 10)) && "0"}{date + 12 >= 24 ? date + 12 - 24 : date + 12}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 12 >= 24 ? date + 12 - 24 : date + 12}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[5].humidity}%

                                        </div>
                                    </div>
                                    <div style={{ color: "white" }} className="row">
                                        <div className="col-2 center">
                                            {((date + 14 - 24 < 10 && date + 14 - 24 >= 0) || (date < 10)) && "0"}{date + 14 >= 24 ? date + 14 - 24 : date + 14}:00
                                        </div>
                                        <div className="col-8">
                                            <div className='top-box'>
                                                <div style={{ width: `${array?.forecast.forecastday[0].hour[`${date + 14 >= 24 ? date + 14 - 24 : date + 14}`].humidity}%` }} className='down-box'>
                                                    .
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 center">
                                            {array?.forecast.forecastday[0].hour[6].humidity}%

                                        </div>
                                    </div>
                                </div>
                                <div className='location-box-wrapper'>
                                    <div className="location-box">
                                        <div>
                                            <PlaceIcon className='location-icon' /> <span className='location-span'>{city}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='weather-box'>
                                <div className='search-box-wrapper'>
                                    <input id="searchInput" onClick={() => { setShow(true) }} onInput={searchFunction} className='search-inp' placeholder='City search' type="text" />
                                    <div onClick={inpWrite} style={(!show || long < 1) ? { display: "none" } : { display: "block" }} id="suggestionsList"></div>
                                </div>
                                <h4 className='today-h4'>Today overview</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='info-box-weather d-flex'>
                                            <div className='icon-weather'>
                                                <AirIcon style={{ color: "#00396e" }} />
                                            </div>
                                            <div style={{ width: "100%" }} >
                                                <div className='write-key'>
                                                    Wind speed
                                                </div>
                                                <div className='write-value'>
                                                    {array?.current.wind_mph}km/h
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='info-box-weather d-flex'>
                                            <div className='icon-weather'>
                                                <ExploreIcon style={{ color: "#00396e" }} />
                                            </div>
                                            <div style={{ width: "100%" }} >
                                                <div className='write-key'>
                                                    Wind Degree
                                                </div>
                                                <div className='write-value'>
                                                    {array?.current.wind_dir}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='info-box-weather d-flex'>
                                            <div className='icon-weather'>
                                                <CompressIcon style={{ color: "#00396e" }} />
                                            </div>
                                            <div style={{ width: "100%" }} >
                                                <div className='write-key'>
                                                    Pressure
                                                </div>
                                                <div className='write-value'>
                                                    {array?.current.pressure_mb} Pascal
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='info-box-weather d-flex'>
                                            <div className='icon-weather'>
                                                <WaterDropIcon style={{ color: "#00396e" }} />
                                            </div>
                                            <div style={{ width: "100%" }} >
                                                <div className='write-key'>
                                                    Humidity
                                                </div>
                                                <div className='write-value'>
                                                    {array?.current.humidity}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className='table-wrapper'>
                                            <div className='table-title'>
                                                Forecast temperature chart
                                            </div>
                                            <div className='table-box'>
                                                <div style={{ width: "100%", height: 300 }}>
                                                    <ResponsiveContainer>
                                                        <AreaChart
                                                            data={data}
                                                            margin={{
                                                                top: 10,
                                                                right: 30,
                                                                left: 0,
                                                                bottom: 0
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;