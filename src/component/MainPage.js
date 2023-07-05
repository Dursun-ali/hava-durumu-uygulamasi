import React, { useState,useEffect } from 'react';
import '../css/MainPage.css'
import PlaceIcon from '@mui/icons-material/Place';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const MainPage = () => {
    const[array,setArray]=useState();
    const[value,setValue]=useState()
    function inpFunc(e) {
        setValue(e.target.value)
    }
    function inpWrite() {
        axios.get(`http://api.weatherstack.com/current?access_key=725774d6898e98531b9fab2b8bf94b31&query=${value}`)
        .then(response=>setArray(response.data))
        .catch(error => {
              console.log(error);
            });
    }
    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=725774d6898e98531b9fab2b8bf94b31&query=New York`)
       .then(response=>setArray(response.data))
       .catch(error => {
             console.log(error);
           });
     },[])
     console.log(array?.current.weather_descriptions[0]);
    return (
        <>
            <div className="main-container">
                <div className="search-container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className='search-box-wrapper'>
                                    <input onChange={inpFunc} className='search-inp' type="text" />
                                    <button  onClick={inpWrite} className='search-btn'><SearchIcon /> Ara</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="weather-container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className='left-wrapper'>
                                <div className='title-section'>
                                    <h1>HAVA DURUMU</h1>
                                </div>
                                <div className='date-section'>
                                    <p>
                                        Saturday, <br /> February 2016
                                    </p>
                                </div>
                                <div className='heat-section d-flex'>
                                    <div className='first-write'>{array?.current.temperature}</div>
                                    {/* <div>
                                        <TripOriginIcon className='second-write' />
                                    </div> */}
                                    <div className='third-write'>
                                        ℃
                                    </div>
                                </div>
                                <div className='weather-section'>
                                    <p>
                                        {array?.current.weather_descriptions[0]}
                                    </p>
                                </div>
                                <div className='location-section'>
                                    <PlaceIcon className='location-icon' /> <span className='location-span'>{array?.location.region}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className='weather-img-container'>
                                        <img src={array?.current.weather_icons} alt="" />
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className='info-wrapper'>
                                        <ul className='info-ul' style={{ listStyleType: "none" }}>
                                            <li> <span className='info-span-first'>Rüzgar Hızı : </span> <span className='info-span-second'>{array?.current.wind_speed}  m/s</span> </li>
                                            <li><span className='info-span-first'>Rüzgar Yönü :</span> <span className='info-span-second'>{array?.current.wind_dir}</span></li>
                                            <li><span className='info-span-first'>Basınç :</span> <span className='info-span-second'>{array?.current.pressure} Pascal</span></li>
                                            <li><span className='info-span-first'>Nem :</span> <span className='info-span-second'>{array?.current.humidity}%</span></li>
                                        </ul>
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