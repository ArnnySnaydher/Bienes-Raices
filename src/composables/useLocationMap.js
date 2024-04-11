import { ref } from 'vue'
export default function useLocationMap() {
  const zoom = ref(35)
  const center = [-12.206885019660753, -76.9332900616295]
  const pin = (e)=> {
    const {lat,lng} = e.target.getLatLng()
    center.value = [lat, lng]
  }
  return {
    zoom,
    center,
    pin
  }
}
