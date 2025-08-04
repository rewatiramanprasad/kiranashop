import React from 'react'
const data = [
  { heading: 'Total dues', data: 'Rs. 100500/-' },
  { heading: 'Maximum dues', data: 'Ankita Mukherjee' },
  { heading: 'Minimum dues', data: 'Debadrita Dey' },
]
function dashboardPage() {
  return (
    <div className="bg-first min-h-screen ">
      <h1 className=" flex justify-center text-2xl pt-6 font-bold text-second">
        Kirana Shop
      </h1>
      <div>
        {data.map((item, index) => {
        
          return (
            <div
              key={index}
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
}

export default dashboardPage
