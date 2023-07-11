import React, { useState, useEffect } from 'react';
import '../css/MainPage.css'
import PlaceIcon from '@mui/icons-material/Place';
import axios from 'axios';
import InfoIcon from '@mui/icons-material/Info';
import CityData from './CityData';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const MainPage = () => {
    const [array, setArray] = useState();
    const [value, setValue] = useState("trabzon")
    const [isLoading, setIsLoading] = useState(true);
    const [warning,setWarning]=useState(false);
    const [show,setShow]=useState(false)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const APP_KEY = "d923ae6770a14f9494d95349232003";
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const [city,setCity]=useState("Trabzon")

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
      }, []);

     function inpWrite(e) {
      setCity(document.getElementsByClassName('data-div')[e.target.id].textContent)
        setShow(false);
        setIsLoading(true);
          const response = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${e.target.id}&days=7&aqi=no&alerts=no`);
          response.then(response=>{
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
              listItem.addEventListener('click', function() {
                searchInput.value = item.cityName.name;
              });
              listItem.id = item.cityData;
              suggestionsList.appendChild(listItem);
            });
          }
          
        return (
        <>
            <div className="main-container">
                <div className="search-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='search-box-wrapper'>
                                <input id="searchInput" onClick={()=>{setShow(true)}} onInput={searchFunction} className='search-inp' placeholder='Search...' type="text" />
                                <div onClick={inpWrite} style={!show ?{display:"none"}:{display:"block"}} id="suggestionsList"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={()=>{setShow(false)}}  className="weather-container">
                    <div className="row">
                        <div  style={warning ? { backgroundColor: "white" } : { display: "none" }} className="information-wrapper">
                                <div style={warning ? {display:"block"}:{display:"none"}} className='information-box'>
                                    <div>
                                    <InfoIcon className='info-warning-icon'/> Aradığınız içerikte Şehir bulunmamaktadır.
                                    </div>
                                    <div>
                                    <ModeEditOutlineIcon className='info-edit-icon' /> ingilizce karakter sorunu olabilir bu ikona basabilirsiniz.
                                    </div>                               
                                </div>
                        </div>
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
                                    <div className='first-write'>{array?.current.temp_c}</div>
                                    <div className='third-write'>
                                        ℃
                                    </div>
                                </div>
                                <div className='weather-section'>
                                    <p>
                                        {array?.current.condition.text}
                                    </p>
                                </div>
                                <div className='location-section'>
                                    <PlaceIcon className='location-icon' /> <span className='location-span'>{city}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className='weather-img-container'>
                                        <img src={array?.current.condition.icon} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className='info-wrapper'>
                                        <ul className='info-ul' style={{ listStyleType: "none" }}>
                                            <li> <span className='info-span-first'>Wind Speed : </span> <span className='info-span-second'>{array?.current.wind_mph}  m/s</span> </li>
                                            <li><span className='info-span-first'>Wind Degree :</span> <span className='info-span-second'>{array?.current.wind_dir}</span></li>
                                            <li><span className='info-span-first'>Pressure :</span> <span className='info-span-second'>{array?.current.pressure_mb} Pascal</span></li>
                                            <li><span className='info-span-first'>Humidity :</span> <span className='info-span-second'>{array?.current.humidity}%</span></li>
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