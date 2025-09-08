'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})
function MapPage() {
  const [CurrLoc, setCurrLoc] = useState({
    lat: 25.587267883908165,
    lng: 85.08559768023852,
  })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }, [])
  console.log(CurrLoc)
  return (
    <MapContainer
      center={[CurrLoc.lat, CurrLoc.lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: 'max-w-[360px] w-full' }}
    >
      <TileLayer
        attribution='&copy;
         <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[CurrLoc.lat, CurrLoc.lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default dynamic(() => Promise.resolve(MapPage), { ssr: false })
