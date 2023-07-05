import axios from 'axios';
import './App.css';
import MainPage from './component/MainPage';
import { useEffect, useState } from 'react';

function App() {

  const key='725774d6898e98531b9fab2b8bf94b31&query';
  const query='New York'
  // const[array,setArray]=useState();

// const params = {
//   access_key: '725774d6898e98531b9fab2b8bf94b31',
//   query: 'New York'
// }

  
  // useEffect(()=>{
  //    axios.get('http://api.weatherstack.com/current?access_key=725774d6898e98531b9fab2b8bf94b31&query=trabzon')
  //   .then(response=>setArray(response.data))
  //   .catch(error => {
  //         console.log(error);
  //       });
  // },[])
  // console.log(array);
  return (
      <> 
      <MainPage/>
      </>
  );
}

export default App;
