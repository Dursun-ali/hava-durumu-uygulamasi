import React from 'react';
import '../css/MainPage.css'
import PlaceIcon from '@mui/icons-material/Place';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import SearchIcon from '@mui/icons-material/Search';
const MainPage = () => {
    return (
        <>
            <div className="main-container">
            <div className="search-container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className='search-box-wrapper'>
                                <input className='search-inp' type="text" />
                                <button className='search-btn'><SearchIcon/> Ara</button>
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
                                    <div className='first-write'>9</div>
                                    <div>
                                        <TripOriginIcon className='second-write' />
                                    </div>


                                    <div className='third-write'>
                                        C
                                    </div>
                                </div>
                                <div className='weather-section'>
                                    <p>
                                        Güneşli
                                    </p>
                                </div>
                                <div className='location-section'>
                                    <PlaceIcon className='location-icon' /> <span className='location-span'>New york , ABD</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <div className='weather-img-container'>
                                        <img src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-8.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className='info-wrapper'>
                                        <ul className='info-ul' style={{listStyleType:"none"}}>
                                            <li> <span className='info-span-first'>Rüzgar Hızı : </span> <span className='info-span-second'>10 km/h</span> </li>
                                            <li><span className='info-span-first'>Rüzgar Yönü :</span> <span className='info-span-second'>Kuzey</span></li>
                                            <li><span className='info-span-first'>Basınç :</span> <span className='info-span-second'>55 Pascal</span></li>
                                            <li><span className='info-span-first'>Nem :</span> <span className='info-span-second'>77%</span></li>
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