let search = document.getElementById('search')
let myBtn = document.getElementById('myBtn')
let myList = document.getElementById('myList')
let clearBtn = document.getElementById('clearBtn')

var todaysDate = new Date();
var dd = String(todaysDate.getDate()).padStart(2, '0')
var mm = String(todaysDate.getMonth() + 1).padStart(2, '0')
var yyyy = todaysDate.getFullYear();

let searchedList = JSON.parse(localStorage.getItem('searchedList')) || []
// searchedList.push({ searchValue, searchValue })
localStorage.setItem('searchedList', JSON.stringify(searchedList))


console.log(searchedList, 'this is searchedList')


for (let i = 0; i < searchedList.length; i++) {
  myList.innerHTML += `
            <br>
            <li class='listItem' data-name='${searchedList[i].searchValue}'>${searchedList[i].searchValue}</li>
             <div class="divider"></div>
        `
}

myBtn.addEventListener('click', event => {
  event.preventDefault()
  console.log('ping')
  console.log(search.value, 'this is search value')
  let searchValue = search.value

  let searchedList = JSON.parse(localStorage.getItem('searchedList')) || []
  searchedList.push({ searchValue })
  localStorage.setItem('searchedList', JSON.stringify(searchedList))
 
  console.log(searchedList, 'this is searchedList')

  document.getElementById('dayOne').innerHTML = ''
  document.getElementById('dayTwo').innerHTML = ''
  document.getElementById('dayThree').innerHTML = ''
  document.getElementById('dayFour').innerHTML = ''
  document.getElementById('dayFive').innerHTML = ''
  document.getElementById('today').innerHTML = ''

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('search').value}&appid=5161675755ce884e1eb2f358700fff24&units=imperial`)
    .then(res => {

      const weather = res.data
      const latitude = weather.coord.lat
      const longitude = weather.coord.lon


      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=5161675755ce884e1eb2f358700fff24`)
        .then(response => {
          const uv = response.data

          const todayElem = document.createElement('div')

          todayElem.innerHTML =

            `
                <div class="row"> 
                  <div class="card horizontal">
                  <div class='col s12 m12 center-align'
                  <span>
                  <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">
                  </span>
                  <h4 class="card-title center" style='font-size: 3vw;'>${weather.name}</h4>
                      <h5 style='font-size: 3vw;'> Current </h5>
                      <div class="card-content">
                        <p style='font-size: 3vw;' > 
                          Humidity: ${weather.main.humidity}%<br>
                          Temp: ${weather.main.temp} ℉<br> 
                          Wind Speed: ${weather.wind.speed} mph <br>
                          <div style='font-size: 3vw;' id="UVindex">UV Index: ${uv.current.uvi} </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            `

          document.getElementById('today').append(todayElem)
          if (uv.current.uvi <= 2) {
            document.getElementById('UVindex').style.color = 'green'
          } else if (uv.current.uvi <= 5) {
            document.getElementById('UVindex').style.color = 'yellow'
          } else {
            document.getElementById('UVindex').style.color = 'red'
          }
          
        })
    })
    .catch(err => console.error(err))


  //forecast

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('search').value}&appid=5161675755ce884e1eb2f358700fff24&units=imperial`)
    .then(res => {

      let forecast = res.data
      console.log(forecast, 'this is forecast')

      let forecastElem = document.createElement('div')
      forecastElem.innerHTML =

        `

<div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}@2x.png">
         
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[3].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[3].main.temp} ℉<br>
             Humidity: ${forecast.list[3].main.humidity}% <br>
             Wind Speed: ${forecast.list[3].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

      const forecastElem2 = document.createElement('div')
      forecastElem2.innerHTML =

        `
     <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[11].weather[0].icon}@2x.png">
         
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[11].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[11].main.temp} ℉<br>
             Humidity: ${forecast.list[11].main.humidity}% <br>
             Wind Speed: ${forecast.list[11].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

      const forecastElem3 = document.createElement('div')
      forecastElem3.innerHTML =

        `
      <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[19].weather[0].icon}@2x.png">
         
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[19].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[19].main.temp} ℉<br>
             Humidity: ${forecast.list[19].main.humidity}% <br>
             Wind Speed: ${forecast.list[19].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

      const forecastElem4 = document.createElement('div')
      forecastElem4.innerHTML =

        `
      <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[27].weather[0].icon}@2x.png">
          
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[27].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[27].main.temp} ℉<br>
             Humidity: ${forecast.list[27].main.humidity}% <br>
             Wind Speed: ${forecast.list[27].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

      const forecastElem5 = document.createElement('div')
      forecastElem5.innerHTML =

        `
      <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[35].weather[0].icon}@2x.png">
        
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[35].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[35].main.temp} ℉<br>
             Humidity: ${forecast.list[35].main.humidity}% <br>
             Wind Speed: ${forecast.list[35].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

      document.getElementById('dayOne').append(forecastElem)
      document.getElementById('dayTwo').append(forecastElem2)
      document.getElementById('dayThree').append(forecastElem3)
      document.getElementById('dayFour').append(forecastElem4)
      document.getElementById('dayFive').append(forecastElem5)


    })
    .catch(err => console.error(err))

})

clearBtn.addEventListener('click', event=>{
  localStorage.clear();
  window.location.reload()
})

document.addEventListener('click', event => {
  if (event.target.className === 'listItem') {
    console.log(event.target.dataset.name, 'this is name')
    let newName = event.target.dataset.name


    document.getElementById('dayOne').innerHTML = ''
    document.getElementById('dayTwo').innerHTML = ''
    document.getElementById('dayThree').innerHTML = ''
    document.getElementById('dayFour').innerHTML = ''
    document.getElementById('dayFive').innerHTML = ''
    document.getElementById('today').innerHTML = ''

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newName}&appid=5161675755ce884e1eb2f358700fff24&units=imperial`)
      .then(res => {

        const weather = res.data
        const latitude = weather.coord.lat
        const longitude = weather.coord.lon


        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=5161675755ce884e1eb2f358700fff24`)
          .then(response => {
            const uv = response.data

            const todayElem = document.createElement('div')

            todayElem.innerHTML =

              `
                 <div class="row">
                  <div class="card horizontal">
                  <div class='col s12 m12 center-align'
                  <span>
                  <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">
                  </span>
                  <h4 class="card-title center" style='font-size: 3vw;'>${weather.name}</h4>
                      <h5 style='font-size: 3vw;'> Current </h5>
                      <div class="card-content">
                        <p style='font-size: 3vw;' > 
                          Humidity: ${weather.main.humidity}%<br>
                          Temp: ${weather.main.temp} ℉<br> 
                          Wind Speed: ${weather.wind.speed} mph <br>
                          <div style='font-size: 3vw;' id="UVindex">UV Index: ${uv.current.uvi} </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            `

            document.getElementById('today').append(todayElem)
            if (uv.current.uvi <= 2) {
              document.getElementById('UVindex').style.color = 'green'
            } else if (uv.current.uvi <= 5) {
              document.getElementById('UVindex').style.color = 'yellow'
            } else {
              document.getElementById('UVindex').style.color = 'red'
            }
          })

      })
      .catch(err => console.error(err))


    //forecast

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${newName}&appid=5161675755ce884e1eb2f358700fff24&units=imperial`)
      .then(res => {

        let forecast = res.data
        console.log(forecast, 'this is forecast')

        let forecastElem = document.createElement('div')
        forecastElem.innerHTML =

          `


<div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}@2x.png">
         
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[3].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[3].main.temp} ℉<br>
             Humidity: ${forecast.list[3].main.humidity}% <br>
             Wind Speed: ${forecast.list[3].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

        const forecastElem2 = document.createElement('div')
        forecastElem2.innerHTML =

          `
     <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[11].weather[0].icon}@2x.png">
         
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[11].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[11].main.temp} ℉<br>
             Humidity: ${forecast.list[11].main.humidity}% <br>
             Wind Speed: ${forecast.list[11].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

        const forecastElem3 = document.createElement('div')
        forecastElem3.innerHTML =

          `
      <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[19].weather[0].icon}@2x.png">
         
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[19].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[19].main.temp} ℉<br>
             Humidity: ${forecast.list[19].main.humidity}% <br>
             Wind Speed: ${forecast.list[19].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

        const forecastElem4 = document.createElement('div')
        forecastElem4.innerHTML =

          `
      <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[27].weather[0].icon}@2x.png">
          
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[27].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[27].main.temp} ℉<br>
             Humidity: ${forecast.list[27].main.humidity}% <br>
             Wind Speed: ${forecast.list[27].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

        const forecastElem5 = document.createElement('div')
        forecastElem5.innerHTML =

          `
      <div class="row">
    <div>
      <div class="card">
        <div class="card-image">
          <img src="http://openweathermap.org/img/wn/${forecast.list[35].weather[0].icon}@2x.png">
        
        </div>
        <h5 class="card-title center">${forecast.city.name} ${forecast.list[35].dt_txt}</h5>
        <div class="card-content">
          <p>
             Temp: ${forecast.list[35].main.temp} ℉<br>
             Humidity: ${forecast.list[35].main.humidity}% <br>
             Wind Speed: ${forecast.list[35].wind.speed} mph
            </p>
        </div>
      </div>
    </div>
  </div>

      `

        document.getElementById('dayOne').append(forecastElem)
        document.getElementById('dayTwo').append(forecastElem2)
        document.getElementById('dayThree').append(forecastElem3)
        document.getElementById('dayFour').append(forecastElem4)
        document.getElementById('dayFive').append(forecastElem5)


      })
      .catch(err => console.error(err))




  }
})

