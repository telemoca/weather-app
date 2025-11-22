export interface CityData {
  name: string
  country: string
  admin1: string
  admin2: string
  latitude: number
  longitude: number
}

export async function getCorrespondingCities(research: string, lang: string, nb_city: number) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${research}&count=${nb_city}&language=${lang}&format=json`
  const response = await fetch(url)
  const data = await response.json()
  const cities: CityData[] = []
  if (data.results) {
    data.results.forEach((elt: CityData) => {
      cities.push({
        name: elt.name,
        country: elt.country,
        admin1: elt.admin1,
        admin2: elt.admin2,
        latitude: elt.latitude,
        longitude: elt.longitude,
      })
    })
  }
  return cities
}

export async function getOneCity(cityName: string, lang: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=${lang}&format=json`
  const response = await fetch(url)
  const data = await response.json()
  const city = data.results[0]
  return {
    name: city.name,
    country: city.country,
    admin1: city.admin1,
    admin2: city.admin2,
    lat: city.latitude,
    lon: city.longitude,
  }
}
