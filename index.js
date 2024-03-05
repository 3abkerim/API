const URL = 'https://jsonplaceholder.typicode.com/todos';


// requête http = un verbe(GET, POST, PUT, DELETE) + un endpoint (/todos, /cars ...)

axios(URL)
  .then(resp => console.log(resp.data)) // state pending ==> fullfilled
  .catch(err => console.log(err.message)); // state pending ==> rejected

// axios
//   .get(URL)
//   .then(resp => console.log(resp.data))
//   .catch(err => console.log(err.message));

// Exo :

// Grab the 103th item in the todos list
// Display into the DOM (title: title of the todo  and resolved: completed or not)

axios.get(URL)
.then(response => {
    const todo = response.data[102]; 
    const todoElement = document.getElementById('todo-item');
    todoElement.innerHTML = `Title: ${todo.title} <br> Completed: ${todo.completed ? 'Yes' : 'No'}`;
})
.catch(error => {
    console.error('Error fetching data:', error.message);
});

// axios(URL).then(({data:todos})=> console.log(todos[102]));




// https://jsonplaceholder.typicode.com/todos

// base_url : https://jsonplaceholder.typicode.com

// endpoint: todos

// intention(verbe) : GET, POST, PUT, DELETE

// Route parameters : https://jsonplaceholder.typicode.com/todos/102 <-- 102 is the route parameter

// Query String Parameters : https://api.com/restaurants?city=Puteaux&ray=10 <-- city and ray are the QSP

// EXO 2 :

// we type a city and we display some condition around the weather associated with - use the OpenWeatherMap API


document.getElementById('search').addEventListener('click', function() {
    let city = document.getElementById('city').value; 
    const apiKey = '02f0811d6a52bbd75347123f28568515'; 
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(weatherURL)
        .then(function(response) {
            const data = response.data;
            const resultElement = document.getElementById('res'); 
            if (data.cod === 200) { 
                console.log(data);
                resultElement.innerHTML = `Weather in ${city}: ${data.weather[0].main}, Temperature: ${data.main.temp}°C`;
            } else {
                resultElement.innerHTML = 'City not found';
            }
        })
        .catch(function(err) {
            console.error('Error fetching data:', err.message);
        });
});





//geolocalisation par GeoLocation_API

navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var config = {
      method: 'get',
      url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=bae79e2b8d16455797958158c448ea55`,
      headers: {}
    };

    axios(config)
    .then(function (response) {
      return response.data; 
    })
    .then(data => {
        if(data.features && data.features.length > 0) {
            const address = data.features[0].properties;
            console.log(address.city); 
            localStorage.setItem("city",address.city);


            //get weather by city name

            let city = address.city; 
            const apiKey = '02f0811d6a52bbd75347123f28568515'; 
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
            axios.get(weatherURL)
                .then(function(response) {
                    const data = response.data;
                    const resultElement = document.getElementById('res'); 
                    if (data.cod === 200) { 
                        console.log(data);
                        resultElement.innerHTML = `La temperature à ${city}: ${data.weather[0].main}, Temperature: ${data.main.temp}°C`;
                    } else {
                        resultElement.innerHTML = 'City not found';
                    }
                })
                .catch(function(err) {
                    console.error('Error fetching data:', err.message);
                });

            // ! get weather by city name


        } else {
            console.log("No address data found.");
        }
    })
    .catch(function (error) {
      console.log(error);
    });
}, function(error) {
    console.log(error);
});
// ! geolocalisation par GeoLocation_API

const ville = localStorage.getItem("city");
console.log(ville);



// var config = {
//   method: 'get',
//   url: 'https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=bae79e2b8d16455797958158c448ea55',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });
  



