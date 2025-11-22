export async function fetchTodayMeteo(
  lat: number,
  lon: number,
  temp_unit = 'celc',
  speed_unit = 'kmph',
  length_unit = 'mm',
) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto${speed_unit === 'mph' ? '&wind_speed_unit=mph' : ''}${temp_unit === 'fahr' ? '&temperature_unit=fahrenheit' : ''}${length_unit === 'in' ? '&precipitation_unit=inch' : ''}`
  const response = await fetch(url)
  if (response.ok) {
    const result = await response.json()
    const {
      temperature_2m,
      weather_code,
      apparent_temperature,
      relative_humidity_2m,
      precipitation,
      wind_speed_10m,
      time,
    } = result.current
    return {
      temperature_2m,
      weather_code,
      apparent_temperature,
      relative_humidity_2m,
      precipitation,
      wind_speed_10m,
      time,
      status: 'ok',
    }
  } else {
    console.error('Error while fetching in fetchTodayMeteo()')
    return {
      status: 'error',
    }
  }
}

export async function fetchDailyForecast(
  lat: number,
  lon: number,
  temp_unit = 'celc',
  speed_unit = 'kmph',
  length_unit = 'mm',
) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto${speed_unit === 'mph' ? '&wind_speed_unit=mph' : ''}${temp_unit === 'fahr' ? '&temperature_unit=fahrenheit' : ''}${length_unit === 'in' ? '&precipitation_unit=inch' : ''}`
  const response = await fetch(url)
  if (response.ok) {
    const result = await response.json()
    const { temperature_2m_max, temperature_2m_min, weather_code, time } = result.daily
    return {
      temperature_2m_max,
      temperature_2m_min,
      weather_code,
      time,
      status: 'ok',
    }
  } else {
    console.error('Error while fetching in fetchTodayMeteo()')
    return {
      status: 'error',
    }
  }
}

export async function fetchHourlyForecast(
  lat: number,
  lon: number,
  temp_unit = 'celc',
  speed_unit = 'kmph',
  length_unit = 'mm',
) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=,temperature_2m,weather_code&timezone=auto${speed_unit === 'mph' ? '&wind_speed_unit=mph' : ''}${temp_unit === 'fahr' ? '&temperature_unit=fahrenheit' : ''}${length_unit === 'in' ? '&precipitation_unit=inch' : ''}`
  const response = await fetch(url)
  if (response.ok) {
    const result = await response.json()
    const { temperature_2m, weather_code } = result.hourly
    return {
      temperature_2m,
      weather_code,
      status: 'ok',
    }
  } else {
    console.error('Error while fetching in fetchTodayMeteo()')
    return {
      status: 'error',
    }
  }
}
