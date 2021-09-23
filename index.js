require('dotenv').config()
const axios = require('axios')
const Telegram = require('node-telegram-bot-api')

const bot = new Telegram(process.env.TELEGRAM_API)

weatherApi = process.env.WEATHER_API

const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather")
weatherUrl.searchParams.set('q','Cebu City, Philippines')
weatherUrl.searchParams.set('appid', weatherApi)
weatherUrl.searchParams.set('units', 'imperial')

const getWeatherData = async () => {
    const response = await axios.get(weatherUrl.toString())
    const data = response.data
    return data
}

const generateWeatherMessage = weatherData => {
    const { name, weather, main} = weatherData
    return `The weather in ${name}: ${weather[0].description}. Current temperature is ${main.temp}, with a low temp of ${main.temp_min} and a high of ${main.temp_max}.`
}

const app = async () => {
    try {
        const weatherData = await getWeatherData()
        const weatherString = generateWeatherMessage(weatherData)
        bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
    } catch (error) {
        throw new Error(error)
    }
    
    
}
// uses: actions/checkout@v1
app()
