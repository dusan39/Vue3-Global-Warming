import axios from "axios";

const VITE_TEMPERATURE_API = import.meta.env.VITE_TEMPERATURE_API
const VITE_CO2_API = import.meta.env.VITE_CO2_API
const VITE_ARCTIC_API = import.meta.env.VITE_ARCTIC_API
const VITE_NO2_API = import.meta.env.VITE_NO2_API
const VITE_METHANE_API = import.meta.env.VITE_METHANE_API

export const temperatureData = async() => {
  try{

    const temperatureAPI = await axios.get(VITE_TEMPERATURE_API)

    return{
      temperatureAPI: temperatureAPI.data.result,
    }
  }catch(err){
    console.log(err);
  }
}

export const co2Data = async() => {
  try{

    const co2API = await axios.get(VITE_CO2_API)
    
    return{
      co2API: co2API.data.co2
    }
  }catch(err){
    console.log(err);
  }
}

export const arcticData = async() => {
  try{
    
    const arcticAPI = await axios.get(VITE_ARCTIC_API)

    return{
      arcticAPI: arcticAPI.data.arcticData,
    }
  }catch(err){
    console.log(err);
  }
}

export const no2Data = async() => {
  try{
    
    const no2API = await axios.get(VITE_NO2_API)

    return{
      no2API: no2API.data.nitrous,
    }
  }catch(err){
    console.log(err);
  }
}

export const methaneData = async() => {
  try{
    
    const methaneAPI = await axios.get(VITE_METHANE_API)

    return{
      methaneAPI: methaneAPI.data.methane,
    }
  }catch(err){
    console.log(err);
  }
}