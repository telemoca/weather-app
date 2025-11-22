export async function getCityFromCoords(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&format=geocodejson`
  const res = await fetch(url)
  const data = await res.json()
  try {
    const geo_data = data.features[0].properties.geocoding
    return { city: geo_data.city, country: geo_data.country, county: geo_data.county }
  } catch (err) {
    console.error('Error while searching the position :', err)
  }
}
