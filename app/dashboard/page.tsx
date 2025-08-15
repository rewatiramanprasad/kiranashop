import Container from '@/components/container'
import React from 'react'

async function DashboardPage() {
  try {
    const response = await fetch('http://localhost:3000/api/dashboard', {
      cache: 'default',
    })
    const res = await response.json()
    if (!res.success) {
      throw new Error(res.message || 'Failed to fetch dashboard data')
    }
    const data = [
      { heading: 'Total dues', data: `Rs. ${res.data.total}/-` },
      { heading: 'Maximum dues', data: res.data.maxDues },
      { heading: 'Minimum dues', data: res.data.minDues },
    ]
    return (
      <div className="bg-first min-h-screen ">
        <h1 className=" flex justify-center text-2xl pt-6 font-bold text-second">
          Kirana Shop
        </h1>
        <div>
          {data.map((item) => {
            return (
              <div
                key={item.heading}
                className="flex  flex-col gap-6 justify-center items-center h-44 m-8 bg-third text-first  rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold">{item.heading}</h2>
                <p className="text-lg">{item.data}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching ContactPage:', error)
    return (
      <Container>
        <div className="text-red-500">
          <h1>Error</h1>
          <p>{message}</p>
        </div>
      </Container>
    )
  }
}

export default DashboardPage
