import Container from '@/components/container'

export default function Home() {
  return (
    <Container>
      <h1 className="flex text-4xl justify-center h-lvh items-center bg-amber-500">
        Kirana Shop {process.env.NEXT_PUBLIC_STAGE}
      </h1>
    </Container>
  )
}
