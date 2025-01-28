
function Forecast(props)
{
    console.log(props.id);
    return(
        <>
       
        <div className="forecastmain">
           
            <p>{props.DAY.day}</p>
            <img src={props.DAY.icon} alt="Loding"/>
            <p>{props.DAY.temp}°C</p>
            <span>{props.DAY.case}</span>
        </div>
        </>
    )
}
export default Forecast;