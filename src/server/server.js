const path = require("path");
const express = require("express"); ////....

// Require Express to run server and routes

const mockAPIResponse = require("./mockAPI.js");

const dotenv = require("dotenv");

const cors = require("cors"); ///......

const fetch = require("node-fetch");

// var fs = require("fs");

// var https =  require('follow-redirects').https;

dotenv.config();

let cuont = 0;
// Start up an instance of app

const app = express();

// Cors for cross origin allowance

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Initialize the main project folder
app.use(express.static("dist"));

// console.log(__dirname);

////.......................

/* Global Variables */

const KEY_Geonames_APi = process.env.KEY_Geonames;

const KEY_Weatherbit_APi = process.env.KEY_Weatherbit;

const KEY_Pixabay_APi = process.env.KEY_Pixabay;

/// geonames API :  EX: ==> //// `http://api.geonames.org/searchJSON?style=FULL&maxRows=1&name_startsWith=irbid&username=`

/// Current Weather API: EX: ==> ////`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${KEY_Weatherbit_APi}`

// lat: Latitude (Degrees).
// lon: Longitude (Degrees).

/// Forecast  Weather API: EX: ==> //// `https://api.weatherbit.io/v2.0/forecast/daily?lat=${}&lon=${}&key=${KEY_Weatherbit_APi}`

//   Pixabay API : EX : ===> /////   `https://pixabay.com/api/?key=${KEY_Pixabay_APi}&q=${city}&image_type=photo`

//////////////  Geonames  methode ::

const get_Geonames = async (city) => {
  const URL_encode = encodeURI(
    `http://api.geonames.org/searchJSON?style=FULL&maxRows=1&name_startsWith=${city}&username=${KEY_Geonames_APi}`
  );
  try {
    const res = await fetch(URL_encode);
    const json_Data = await res.json();

    if (json_Data && json_Data.geonames) {
      console.log(
        " json_Data.geonames[0].lat ---->>> " + json_Data.geonames[0].lat
      );
      console.log(
        " json_Data.geonames[0].lng ---->>> " + json_Data.geonames[0].lng
      );

      return {
        lat: json_Data.geonames[0].lat,
        lng: json_Data.geonames[0].lng,
      };
    } else {
      throw new Error("get_Geonames  data in json_Data not found");
    }
  } catch (error) {
    console.log(
      "can't fetching API get_Geonames methode or return data  :  ",
      error
    );
  }
};

//////////////  weatherbit methode ::

const get_weatherbit = async (latitude, longitude, DaysLeft) => {
  console.log(
    " ## get_weatherbit method --> latitude, longitude, DaysLeft :::----->>>>  " +
      latitude,
    longitude,
    DaysLeft
  );

  try {
    if (DaysLeft <= 7) {
      const URL_encode = encodeURI(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${KEY_Weatherbit_APi}`
      );

      const res = await fetch(URL_encode);

      const json_Data = await res.json();

      console.log(
        " ## get_weatherbit method --> json_Data.data :::----->>>>  " +
          json_Data.data
      );

      return json_Data.data[0];
    } else {
      const URL_encode = encodeURI(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${KEY_Weatherbit_APi}`
      );

      const res = await fetch(URL_encode);

      const json_Data = await res.json();

      console.log(
        " ## get_weatherbit method --> json_Data.data  ( DaysLeft >7 ) :::----->>>>  " +
          json_Data.data
      );

      return json_Data.data[0];
    }
  } catch (error) {
    console.log(" Error fetching get_weatherbit Methode : ", error);
  }
};

//////////////  Pixabay methode ::

const get_ImageCity_Pixabay = async (city) => {
  const URL_encode = encodeURI(
    `https://pixabay.com/api/?key=${KEY_Pixabay_APi}&q=${city}&image_type=photo`
  );
  try {
    const res = await fetch(URL_encode);
    const json_Data = await res.json();

    console.log(json_Data.hits[0].webformatURL);

    return json_Data.hits[0].webformatURL;
  } catch (error) {
    console.log(
      "can't fetching images get_ImageCity_Pixabay methode : ",
      error
    );
  }
};

////   new post route  .......... http://localhost:3000/addpostnew

app.post("/post", async (req, res) => {
  ////////////////////////////////////+++++++++

  cuont += 1;

  console.log(` cuont naw in  /addpostnew method it is : ${cuont} `);

  const { city, DaysLeft } = req.body;

  console.log("city + DaysLeft  ::::+++>  " + city + DaysLeft);

  const Geonames = await get_Geonames(city);

  const weatherbit = await get_weatherbit(Geonames.lat, Geonames.lng, DaysLeft);

  const image_Pixabay = await get_ImageCity_Pixabay(city);

  console.log("Sacsses post methode  to servar   !!!!!!!!!!!!!");

  console.log(image_Pixabay, {
    weatherbit: {
      high: weatherbit.high_temp,
      low: weatherbit.low_temp,
      description: weatherbit.weather.description,
    },
  });

  return res
    .send({
      image_Pixabay,
      weatherbit: {
        temp: weatherbit.temp,
        description: weatherbit.weather.description,
      },
    })
    .status(200); ////...... 200 ==> successful
});

///// GET route ..........  http://localhost:8081/
app.get("/", function (req, res) {
  cuont += 1;

  console.log(` / cuont naw it is : ${cuont} `);

  // res.sendFile(path.resolve('dist/index.html')).status(200); ////  200 ==> successful

  res.sendFile(path.join(__dirname, "dist", "index.html")).status(200); ////  200 ==> successful
});

// Setup Server
const port = "8081"; /// http://localhost:8081/
app.listen(port, Servar_Running);

function Servar_Running() {
  console.log(`Servar Is Running Now on localhost: ${port}`);
}

///// GET route ..........  http://localhost:8081/test

app.get("/test", function (req, res) {
  cuont -= 1;

  console.log(` /test cuont naw it is : ${cuont} `);

  res.send(mockAPIResponse).status(200); ////  200 ==> successful
});

/*

Example Response (JSON)://////////////  weatherbit methode ::


          {  
             "data":[  
                {  
                  "valid_date":"2017-04-01",
                   "ts":1503954000,
                   "datetime":"2017-04-01",
                   "wind_gust_spd":16.7,
                   "wind_spd":6.4,
                   "wind_dir":45,
                   "wind_cdir":"NE",
                   "wind_cdir_full":"northeast",
                   "temp":25,
                   "max_temp":30,
                   "min_temp":26,
                   "high_temp":30,
                   "low_temp":24.5,
                   "app_max_temp":30.64,
                   "app_min_temp":23.64,
                   "pop":0,
                   "precip":0,
                   "snow":0,
                   "snow_depth":0,
                   "slp":1017,
                   "pres":1003.5,
                   "dewpt":17.8,
                   "rh":64.3,
                   "weather":{  
                      "icon":"c04d",
                      "code":"804",
                      "description":"Overcast clouds"
                   },
                   "clouds_low":25,
                   "clouds_mid":100,
                   "clouds_hi":50,
                   "clouds":100,
                   "vis":10,
                   "max_dhi":178,
                   "uv":2,
                   "moon_phase":0.99,
                   "moon_phase_lunation":0.48,
                   "moonrise_ts":1530341260,
                   "moonset_ts":1530351260,
                   "sunrise_ts":1530321260,
                   "sunset_ts":1530391260
                }, ...
             ],
             "city_name":"Raleigh",
             "lon":"-78.63861",
             "timezone":"America\/New_York",
             "lat":"35.7721",
             "country_code":"US",
             "state_code":"NC"
          }


*/
