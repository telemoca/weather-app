import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserSettingsStore = defineStore('user-settings', () => {
  const temp_unit = ref<string>('celc')
  const speed_unit = ref<string>('kmph')
  const length_unit = ref<string>('mm')
  const day_for_hourly_forecast = ref<string>('monday')

  return {
    temp_unit,
    speed_unit,
    length_unit,
    day_for_hourly_forecast,
  }
})
