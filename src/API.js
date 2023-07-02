import axios from "axios";

const VITE_TEMPERATURE_API = import.meta.env.VITE_TEMPERATURE_API
const VITE_CO2_API = import.meta.env.VITE_CO2_API
const VITE_ARCTIC_API = import.meta.env.VITE_ARCTIC_API
const VITE_NO2_API = import.meta.env.VITE_NO2_API
const VITE_METHANE_API = import.meta.env.VITE_METHANE_API

export const allAPI = async() => {
  try{
    const temperatureAPI = await axios.get(VITE_TEMPERATURE_API)
    const co2API = await axios.get(VITE_CO2_API)
    const arcticAPI = await axios.get(VITE_ARCTIC_API)
    const no2API = await axios.get(VITE_NO2_API)
    const methaneAPI = await axios.get(VITE_METHANE_API)
    
    return{
      temperatureAPI: temperatureAPI.data.result,
      co2API: co2API.data.co2,
      arcticAPI: arcticAPI.data.arcticData,
      no2API: no2API.data.nitrous,
      methaneAPI: methaneAPI.data.methane
    }
  }catch(err){
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  allAPI()
});