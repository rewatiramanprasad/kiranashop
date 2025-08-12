import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function Heading({
  title,
  backButton,
}: {
  title: string
  backButton?: boolean
}) {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className="relative flex items-center justify-center py-4">
      {backButton && (
        <button
          onClick={handleBack}
          className="absolute text-2xl left-0  flex items-center  bg-transparent"
        >
          <ArrowLeft color="#d9d9d9" size={28} />
        </button>
      )}
      <h1 className="text-2xl font-bold tracking-wider text-third">{title}</h1>
    </div>
  )
}

export default Heading
