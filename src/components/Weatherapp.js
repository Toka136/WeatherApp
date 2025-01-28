import {  useState } from 'react';
import './Weather.css'
import Forecast from './Forecast';
function Weatherapp()
{
    const [temp,settemp]=useState();
    const [Des,setDes]=useState();
    const [icon,seticon]=useState();
    const [daystemp,setdaystemp]=useState();
    const [cityname,setcityname]=useState("");
    const [found,setfound]=useState("start");
    function searchtemp(event)
    {
        event.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=4074a14e77d78ca2ecb66c2fd52f067f&units=metric`)
        .then(response => response.json())
        .then
        (
            data => {
                if(data.message!=="city not found"){
                // console.log(data)
            let temp1=data.main.temp;
            let case2=data.weather[0].main;
             let c=0;
             settemp(temp1);
             setDes(case2);
             setfound("true");
             seticon( `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            
             fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=4074a14e77d78ca2ecb66c2fd52f067f&units=metric`)
             .then(response1=>response1.json())
             .then( data1 => {
                // console.log("ininin\n");
               const days=data1.list;
               const Dayslist=[];
               days.map((x)=>
            {
               
                const a=Dayslist.find((l)=>l.day===x.dt_txt.slice(0,10))
                if(!a)
                { 
                    
                    const date=x.dt_txt;
                    const Date=date.slice(0,10);
                    const Temp=x.main.temp;
                    const Case=x.weather[0].main;
                    const Icon=`https://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`;
                    const Day={"id":c,"day":Date,"temp":Temp,"case":Case,"icon":Icon};
                    c++;
                    Dayslist.push(Day);
                    
                }
                else
                {

                }
               
            return;}
        )
                 setdaystemp(Dayslist);
            }
          
        )
             .catch(error => console.error('Error:', error));
                }
                else
                {
                    setfound("false");
                }
        }
        )
        .catch(error => console.error('Error:', error));
      
       
    }
 
   

    return(
        <div className='mainpage'>
        <div className='title'>
            <h1>discover the weather in every city yo go</h1>
        </div>
            <div className="search">
         <form className="d-flex" role="search" onSubmit={searchtemp}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(x)=>setcityname(x.target.value)}/>
        <div className='button-show'>
        <button className="btn btn-outline-success" type="submit" ><i class="fa-solid fa-magnifying-glass"></i></button></div>
      </form>
      </div>
      {found!=="start"?
      <div className='contain-weather'>
    
      <div className='maintemp'>
        <div className='icon'>
            {found==="true"?  <img src={ icon} alt='loading' />:null}
      
        </div>
        <div className='temp'>
           
           <p>{ found==="true"?`${temp}°C`:"Invali City Name"}</p>
           {found==="true"?<span>{Des}</span>:null}
           
        </div>
      </div>
      {found==="true"?
       
     daystemp?
<div className='forecast-5'> 
         {daystemp.map((x)=>
            {
                return(
                    
                     x.id<=4? <Forecast DAY={x} key={x.id}/> :null
                    
                
               
                )
                
            }
            )}
            {/* {console.log(daystemp)} */}
          </div>
          :null
            :null}
      </div>
      :null}
        </div>
    )
}
export default Weatherapp;