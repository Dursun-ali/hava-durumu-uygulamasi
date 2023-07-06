import React, { useState, useEffect } from 'react';
import '../css/MainPage.css'
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const MainPage = () => {
    const [array, setArray] = useState();
    const [value, setValue] = useState()
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    function inpFunc(e) {
        setValue(e.target.value)
    }
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://api.weatherstack.com/current?access_key=24689b01fb90469e7fe8ddd4fe670ca7&query=New York`);
            setArray(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);

    function inpWrite() {
        setIsLoading(true)
        axios.get(`https://api.weatherstack.com/current?access_key=24689b01fb90469e7fe8ddd4fe670ca7&query=${value}`)
            .then(response => {
                setArray(response.data)
                setIsLoading(false)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false)
            });
    }
        console.log(array);
        return (
        <>
            <div className="main-container">
                <div className="search-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='search-box-wrapper'>
                                <input onChange={inpFunc} className='search-inp' type="text" />
                                <button onClick={inpWrite} className='search-btn'><SearchIcon /> City Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="weather-container">
                    <div className="row">
                        <div style={isLoading ? { backgroundColor: "#F7F7F7" } : { display: "none" }} className='loading-wrapper'>
                            <div style={isLoading ? { display: "block" } : { display: "none" }}>
                                <div className="loading-spinner"></div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className='left-wrapper'>
                                <div className='title-section'>
                                    <h1>Weather</h1>
                                </div>
                                <div className='date-section'>
                                    <p>
                                        {formattedDate}
                                    </p>
                                </div>
                                <div className='heat-section d-flex'>
                                    <div className='first-write'>{array?.current?.temperature}</div>
                                    <div className='third-write'>
                                        ℃
                                    </div>
                                </div>
                                <div className='weather-section'>
                                    <p>
                                        {array?.current.weather_descriptions}
                                    </p>
                                </div>
                                <div className='location-section'>
                                    <PlaceIcon className='location-icon' /> <span className='location-span'>{array?.location?.region}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className='weather-img-container'>
                                        <img src={array?.current?.weather_icons} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className='info-wrapper'>
                                        <ul className='info-ul' style={{ listStyleType: "none" }}>
                                            <li> <span className='info-span-first'>Wind Speed : </span> <span className='info-span-second'>{array?.current?.wind_speed}  m/s</span> </li>
                                            <li><span className='info-span-first'>Wind Degree :</span> <span className='info-span-second'>{array?.current?.wind_dir}</span></li>
                                            <li><span className='info-span-first'>Pressure :</span> <span className='info-span-second'>{array?.current?.pressure} Pascal</span></li>
                                            <li><span className='info-span-first'>Humidity :</span> <span className='info-span-second'>{array?.current?.humidity}%</span></li>
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