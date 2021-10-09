import 'bootstrap/dist/css/bootstrap.min.css';
import {Card ,Button ,InputGroup , FormControl} from 'react-bootstrap';
import './App.css';
import { useState, useEffect, useRef } from "react"
import axios from 'axios';

function App() {
  const [weather, setweather] = useState(null)

  // const [cityName, setCityName] = useState("karachi")
  const cityName = useRef(null);

  const [location, setLocation] = useState(null)

  const [submit, setSubmit] = useState(false)

  useEffect(() => {

    let name = "";

    if (cityName.current.value) {
      name = `q=${cityName.current.value}`
    } else if (location) {

      if (!location) {

      } else if (location === "fail") {
        name = "q=new york";
      } else if (location && location.latitude) {
        name = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
        .then(res => {
          const newWeather = res.data;
          // console.log("newWeather: ", newWeather);

          setweather(newWeather);
        });
    }

  }, [submit, location]);


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          // console.log("position got: ", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);

  return (<div className="maindiv">
    <h1 style={{fontWeight:'bolder',textAlign:"center", color:'black', textDecorationColor:'brown', textDecoration:'5px underline'}}> Weather App </h1>
    <Card  className=' card'>
  <Card.Body>
  <div>

<h1 className="cityText">City Name:</h1>
<InputGroup className="mb-3">
  <FormControl
    placeholder="Enter Your City Name"
    aria-label="Username"
    aria-describedby="basic-addon1"
    ref={cityName}
  /> &nbsp;

{/* <br /> */}
<Button variant="primary" onClick={() => {

  console.log("name: ", cityName.current.value)

  setSubmit(!submit)

}} >Submit</Button>
</InputGroup>
<br />

{/* <h1>{weather?.main?.temp}</h1> */}

{
  (weather !== null) ?
    <> <br />
      <h3>Weather location: {weather.name}  </h3><br />
      <h1>Temperature:{weather?.main?.temp}</h1><br />
      <h2>Description:{weather?.weather[0].main}</h2><br />
      <h2>Wind Speed: {weather?.wind.speed}</h2><br />
    </>
    :
    <h1>Loading...</h1>
}

</div>
  </Card.Body>
</Card>
    </div>
  );
}
export default App;