import { InputChecker } from "./AppInputChecker";
import { Get_TimeLeft } from "./GetTime";

function Get_API_Action(event) {
  // debugger;

  event.preventDefault();

  const city_name = document.getElementById("city").value; /// local variable///  get data from text box's .

  const dateInput = document.getElementById("Date").value; /// local variable///  get data from text box's .

  const days_to_left = Get_TimeLeft(dateInput);

  console.log(days_to_left);

  if (Client.InputChecker(city_name)) {
    fetch("http://localhost:8081/post", {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: city_name,
        DaysLeft: days_to_left,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("the respons is " + res);
        const { image_Pixabay, weatherbit } = res;

        const image_html = document.getElementById("image");

        const temp_html = document.getElementById("temp");

        const description_html = document.getElementById("description");

        image_html.src = image_Pixabay;

        //  make html elmante to set in to  ID .
        temp_html.innerHTML = `  Temp  it is  : ${weatherbit.temp}  `;

        description_html.innerHTML = `  Description it is : ${weatherbit.description}  `;

        // temp_html.innerHTML = ""; // reset results to add new value .
        // description_html.innerHTML = ""; // reset results to add new value .
        // image_html.src = ""; // reset results to add new value .

        alert(" Sacsses add HTML element ! :  Test 1  "); ///  test if add elemante or no .

        return res;
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    alert("  inter Please a valid city name ::->  ");
  }
}

export { Get_API_Action };

// //////////////////////////////////////////////////////////

/////  <<<<  Refrens Resorcs  api  >>>>

//////////////////  pixabay API  :

/*


Parameters
key (required)	str	Your API key: 39242003-ef9248799780442ec559b2a58
q	str	A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters.
Example: "yellow+flower"
lang	str	Language code of the language to be searched in.
Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zh
Default: "en"
id	str	Retrieve individual images by ID.
image_type	str	Filter results by image type.
Accepted values: "all", "photo", "illustration", "vector"
Default: "all"
orientation	str	Whether an image is wider than it is tall, or taller than it is wide.
Accepted values: "all", "horizontal", "vertical"
Default: "all"
category	str	Filter results by category.
Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music
min_width	int	Minimum image width.
Default: "0"
min_height	int	Minimum image height.
Default: "0"
colors	str	Filter images by color properties. A comma separated list of values may be used to select multiple properties.
Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
editors_choice	bool	Select images that have received an Editor's Choice award.
Accepted values: "true", "false"
Default: "false"
safesearch	bool	A flag indicating that only images suitable for all ages should be returned.
Accepted values: "true", "false"
Default: "false"
order	str	How the results should be ordered.
Accepted values: "popular", "latest"
Default: "popular"
page	int	Returned search results are paginated. Use this parameter to select the page number.
Default: 1
per_page	int	Determine the number of results per page.
Accepted values: 3 - 200
Default: 20
callback	string	JSONP callback function name
pretty	bool	Indent JSON output. This option should not be used in production.
Accepted values: "true", "false"
Default: "false"




*/

/*


{
  "total": 4692,
  "totalHits": 500,
  "hits": [
      {
          "id": 195893,
          "pageURL": "https://pixabay.com/en/blossom-bloom-flower-195893/",
          "type": "photo",
          "tags": "blossom, bloom, flower",
          "previewURL": "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg"
          "previewWidth": 150,
          "previewHeight": 84,
          "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
          "webformatWidth": 640,
          "webformatHeight": 360,
          "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
          "fullHDURL": "https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg",
          "imageURL": "https://pixabay.com/get/ed6a9364a9fd0a76647.jpg",
          "imageWidth": 4000,
          "imageHeight": 2250,
          "imageSize": 4731420,
          "views": 7671,
          "downloads": 6439,
          "likes": 5,
          "comments": 2,
          "user_id": 48777,
          "user": "Josch13",
          "userImageURL": "https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg",
      },
      {
          "id": 73424,
          ...
      },
      ...
  ]
  }

*/

//  weatherbit :

/*


Example Request:
https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely








data: [
lat: Latitude (Degrees).
lon: Longitude (Degrees).
sunrise: Sunrise time UTC (HH:MM).
sunset: Sunset time UTC (HH:MM).
timezone: Local IANA Timezone.
station: [DEPRECATED] Nearest reporting station ID.
sources: List of data sources used in response.
ob_time: Last observation time (YYYY-MM-DD HH:MM).
datetime: [DEPRECATED] Current cycle hour (YYYY-MM-DD:HH).
ts: Last observation time (Unix timestamp).
city_name: City name.
country_code: Country abbreviation.
state_code: State abbreviation/code.
pres: Pressure (mb).
slp: Sea level pressure (mb).
wind_spd: Wind speed (Default m/s).
gust: Wind gust speed (Default m/s).
wind_dir: Wind direction (degrees).
wind_cdir: Abbreviated wind direction.
wind_cdir_full: Verbal wind direction.
temp: Temperature (default Celsius).
app_temp: Apparent/"Feels Like" temperature (default Celsius).
rh: Relative humidity (%).
dewpt: Dew point (default Celsius).
clouds: Cloud coverage (%).
pod: Part of the day (d = day / n = night).
weather: {
icon:Weather icon code.
code:Weather code.
description: Text weather description.
}
vis: Visibility (default KM).
precip: Liquid equivalent precipitation rate (default mm/hr).
snow: Snowfall (default mm/hr).
uv: UV Index (0-11+).
aqi: Air Quality Index [US - EPA standard 0 - +500]
dhi: Diffuse horizontal solar irradiance (W/m^2) [Clear Sky]
dni: Direct normal solar irradiance (W/m^2) [Clear Sky]
ghi: Global horizontal solar irradiance (W/m^2) [Clear Sky]
solar_rad: Estimated Solar Radiation (W/m^2).
elev_angle: Solar elevation angle (degrees).
h_angle: [DEPRECATED] Solar hour angle (degrees).
]



*/

// Forecast  Weather API:

/*


Example Request:
https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY





Field Decriptions:
lat: Latitude (Degrees)
lon: Longitude (Degrees)
timezone: Local IANA Timezone
city_name: Nearest city name
country_code: Country abbreviation
state_code: State abbreviation/code
data: [
valid_date:Local date the forecast is valid for in format YYYY-MM-DD
ts: Forecast period start unix timestamp (UTC)
datetime:[DEPRECATED] Forecast valid date (YYYY-MM-DD)
wind_gust_spd: Wind gust speed (Default m/s)
wind_spd: Wind speed (Default m/s)
wind_dir: Wind direction (degrees)
wind_cdir: Abbreviated wind direction
wind_cdir_full: Verbal wind direction
temp: Average Temperature (default Celsius)
max_temp: Maximum Temperature - Calculated from Midnight to Midnight local time (default Celsius)
min_temp: Minimum Temperature - Calculated from Midnight to Midnight local time (default Celsius)
high_temp: High Temperature "Day-time High" - Calculated from 7 AM to 7 PM local time (default Celsius)
low_temp: Low Temperature "Night-time Low" - Calculated from 7 PM to 7 AM local (default Celsius)
app_max_temp: Apparent/"Feels Like" temperature at max_temp time (default Celsius)
app_min_temp: Apparent/"Feels Like" temperature at min_temp time (default Celsius)
pop: Probability of Precipitation (%)
precip: Accumulated liquid equivalent precipitation (default mm)
snow: Accumulated snowfall (default mm)
snow_depth: Snow Depth (default mm)
pres: Average pressure (mb)
slp: Average sea level pressure (mb)
dewpt: Average dew point (default Celsius)
rh: Average relative humidity (%)
weather: {
icon:Weather icon code
code:Weather code
description: Text weather description
}
clouds_low: Low-level (~0-3km AGL) cloud coverage (%)
clouds_mid: Mid-level (~3-5km AGL) cloud coverage (%)
clouds_hi: High-level (>5km AGL) cloud coverage (%)
clouds: Average total cloud coverage (%)
vis: Visibility (default KM)
max_dhi: [DEPRECATED] Maximum direct component of solar radiation (W/m^2)
uv: Maximum UV Index (0-11+)
ozone: Average Ozone (Dobson units)
moon_phase: Moon phase illumination fraction (0-1)
moon_phase_lunation: Moon lunation fraction (0 = New moon, 0.50 = Full Moon, 0.75 = Last quarter moon)
moonrise_ts: Moonrise time unix timestamp (UTC)
moonset_ts: Moonset time unix timestamp (UTC)
sunrise_ts: Sunrise time unix timestamp (UTC)
sunset_ts: Sunset time unix timestamp (UTC)
... ]







Example Response (JSON):

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
