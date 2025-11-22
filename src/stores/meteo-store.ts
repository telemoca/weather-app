import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchDailyForecast, fetchHourlyForecast, fetchTodayMeteo } from '@/api/meteo'
import { useUserSettingsStore } from './user-settings-store'
import { useLocationStore } from './location-store'
import { getCityFromCoords } from '@/api/location'

export const useMeteoStore = defineStore('meteo', () => {
  const userSettingsStore = useUserSettingsStore()
  const locationStore = useLocationStore()
  const city = ref<string>('')
  const country = ref<string>('')
  const county = ref<string>('')
  const hasCity = ref<boolean>(false)
  const time = ref<string>('')
  const today_temperature_2m = ref<number>(0)
  const today_weather_code = ref<number>()
  const today_apparent_temperature = ref<number>(0)
  const today_relative_humidity_2m = ref<number>(0)
  const today_precipitation = ref<number>(0)
  const today_wind_speed_10m = ref<number>(0)
  const next_week_temperatures_2m_max = ref<number>(0)
  const next_week_temperatures_2m_min = ref<number>(0)
  const next_week_weather_codes = ref<number>(0)
  const next_hours_temperature_2m = ref<number>(0)
  const next_hours_weather_code = ref<number>(0)
  const daily_temp_min = ref<number[]>([])
  const daily_temp_max = ref<number[]>([])
  const daily_weather_code = ref<number[]>([])
  const daily_time = ref<string[]>([])
  const hourly_temp = ref<number[]>([])
  const hourly_weather_code = ref<number[]>([])
  const isFetchingWeather = ref<boolean>(false)
  const isReadyToDisplay = computed(() => {
    return !isFetchingWeather.value && hasCity.value
  })
  const noCityFound = ref(false)
  const isAPIWorking = ref(true)

  const updateTodayMeteo = async () => {
    const today_meteo = await fetchTodayMeteo(
      locationStore.latitude,
      locationStore.longitude,
      userSettingsStore.temp_unit,
      userSettingsStore.speed_unit,
      userSettingsStore.length_unit,
    )
    if (today_meteo !== undefined) {
      if (today_meteo.status === 'ok') {
        today_temperature_2m.value = today_meteo.temperature_2m
        today_weather_code.value = today_meteo.weather_code
        today_apparent_temperature.value = today_meteo.apparent_temperature
        today_relative_humidity_2m.value = today_meteo.relative_humidity_2m
        today_precipitation.value = today_meteo.precipitation
        today_wind_speed_10m.value = today_meteo.wind_speed_10m
        time.value = today_meteo.time
      } else {
        isAPIWorking.value = false
      }
    } else {
      isAPIWorking.value = false
    }
  }

  const updateDailyMeteo = async () => {
    const dailyForecast = await fetchDailyForecast(
      locationStore.latitude,
      locationStore.longitude,
      userSettingsStore.temp_unit,
      userSettingsStore.speed_unit,
      userSettingsStore.length_unit,
    )
    if (dailyForecast !== undefined) {
      if (dailyForecast.status === 'ok') {
        daily_temp_min.value = dailyForecast?.temperature_2m_min
        daily_temp_max.value = dailyForecast?.temperature_2m_max
        daily_weather_code.value = dailyForecast?.weather_code
        daily_time.value = dailyForecast?.time
      } else {
        isAPIWorking.value = false
      }
    } else {
      isAPIWorking.value = false
    }
  }

  const updateHourlyMeteo = async () => {
    const hourlyForecast = await fetchHourlyForecast(
      locationStore.latitude,
      locationStore.longitude,
      userSettingsStore.temp_unit,
      userSettingsStore.speed_unit,
      userSettingsStore.length_unit,
    )
    if (hourlyForecast !== undefined) {
      if (hourlyForecast.status === 'ok') {
        hourly_temp.value = hourlyForecast?.temperature_2m
        hourly_weather_code.value = hourlyForecast?.weather_code
      } else {
        isAPIWorking.value = false
      }
    } else {
      isAPIWorking.value = false
    }
  }

  const updateCity = async () => {
    const data = await getCityFromCoords(locationStore.latitude, locationStore.longitude)
    if (data) {
      city.value = data.city
      country.value = data.country
      county.value = data.county
      hasCity.value = true
    }
  }

  const updateEveryWeather = async () => {
    isFetchingWeather.value = true
    await Promise.all([updateTodayMeteo(), updateDailyMeteo(), updateHourlyMeteo(), updateCity()])
    isFetchingWeather.value = false
  }

  return {
    city,
    country,
    county,
    hasCity,
    time,
    today_temperature_2m,
    today_weather_code,
    today_apparent_temperature,
    today_relative_humidity_2m,
    today_precipitation,
    today_wind_speed_10m,
    next_week_temperatures_2m_max,
    next_week_temperatures_2m_min,
    next_week_weather_codes,
    next_hours_temperature_2m,
    next_hours_weather_code,
    daily_temp_min,
    daily_temp_max,
    daily_weather_code,
    daily_time,
    hourly_temp,
    hourly_weather_code,
    isFetchingWeather,
    isReadyToDisplay,
    noCityFound,
    isAPIWorking,
    updateTodayMeteo,
    updateDailyMeteo,
    updateHourlyMeteo,
    updateCity,
    updateEveryWeather,
  }
})
