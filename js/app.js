const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector(".details")
const time = document.querySelector('.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

    const cityDets = data.cityDetails
    const weather = data.weather
    
    //destructure properties
    //const { cityDets, weather } = data

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `

    //update the night-day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)
 

    let timeSrc = null

    weather.IsDayTime ? timeSrc = 'img/day.svg' : timeSrc = 'img/night.svg'
    
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    // } else {
    //     timeSrc = 'img/night.svg'
    // }

    time.setAttribute('src', timeSrc)

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

const updateCity = async (city) => {

    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)

    return {
        cityDetails,
        weather
    }
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //.city = name="city"
    //get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    //update UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
})