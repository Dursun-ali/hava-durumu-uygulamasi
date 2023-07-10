import React, { useState, useEffect } from 'react';
import '../css/MainPage.css'
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import InfoIcon from '@mui/icons-material/Info';
import CityData from './CityData';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const MainPage = () => {
    const [array, setArray] = useState();
    const [value, setValue] = useState()
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
    const [long,setLong]=useState(0)

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=London&days=7&aqi=no&alerts=no`);
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
    async function inpWrite() {
        setShow(false);
        setIsLoading(true);
      
        try {
          await replaceWord();
          const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=7&aqi=no&alerts=no`);
          setArray(response.data);
          setIsLoading(false);
          setWarning(false);
          console.log(response.data);
        } catch (error) {
          console.log(error);
          setWarning(true);
          setIsLoading(false);
        }
      }
      async function replaceWord  () {
        return new Promise(resolve => {
        const words = value.split(' ');
        const updatedWords = words.map(word => {
          const turkishChars = 'çÇğĞıİöÖşŞüÜ';
          const englishChars = 'cCgGiIoOsSuU';
          let updatedWord = '';
    
          for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const index = turkishChars.indexOf(char);
            if (index !== -1) {
              updatedWord += englishChars[index];
            } else {
              updatedWord += char;
            }
          }
          return updatedWord;
        });
    
        const updatedText = updatedWords.join(' ');
        setValue(updatedText);
        resolve();
      });}
    function selectWrite() {
        setValue(document.getElementsByClassName('search-inp')[0].value)
        setLong(document.getElementsByClassName('search-inp')[0].value.length)
    }
    function searchFunction(e){
        setValue(e.target.value)
        setLong(e.target.value.length)
        setShow(true)
        const searchValue = searchInput.value.toLowerCase();
        suggestionsList.innerHTML = '';
        const filteredData = CityData.filter(item => item.toLowerCase().includes(searchValue));
        filteredData.forEach(item => {
          const listItem = document.createElement('div');
          listItem.classList.add("data-div")
          listItem.textContent = item;
          listItem.addEventListener('click', function() {
            searchInput.value = item;
          });
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
                                <button style={long>0? {display:"block"}:{display:"none"}} className='edit-info-btn' onClick={replaceWord}><ModeEditOutlineIcon id="edit-info"/></button>
                                <input id="searchInput" onClick={()=>{setShow(true)}} onInput={searchFunction} className='search-inp' type="text" />
                                <div onClick={selectWrite} style={!show ?{display:"none"}:{display:"block"}} id="suggestionsList"></div>
                                <button onClick={inpWrite} className='search-btn'><SearchIcon /> City Search</button>
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
                                    <PlaceIcon className='location-icon' /> <span className='location-span'>{array?.location.name}</span>
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