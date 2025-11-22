import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const latitude = ref<number>(0)
  const longitude = ref<number>(0)

  // récupère la lat et lon de l'utilisateur
  const getLocation = async (): Promise<{ ok: boolean }> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          latitude.value = pos.coords.latitude
          longitude.value = pos.coords.longitude

          resolve({ ok: true })
        },
        (err) => {
          console.error('Error finding position :', err)
          resolve({ ok: false })
        },
      )
    })
  }

  return {
    latitude,
    longitude,
    getLocation,
  }
})
