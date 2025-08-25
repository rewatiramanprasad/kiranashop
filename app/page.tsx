'use client'
import Container from '@/components/container'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
// import shoppinglady from '../public/Shopping.lottie'

export default function Home() {
  return (
    <Container>
      <div className="flex items-center justify-center mt-55">
        <DotLottieReact
          src="/shoppingLady.lottie"
          loop
          autoplay
          className="w-100 h-50 "
        />
      </div>
    </Container>
  )
}
