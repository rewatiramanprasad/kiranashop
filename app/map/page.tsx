'use client'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('@/components/mapLeaflet'), {
  ssr: false,
})

export default function Map() {
  return <LeafletMap />
}
