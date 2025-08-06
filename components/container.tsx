import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-first min-h-screen">
      <div className="pt-4 mx-4">{children}</div>
    </div>
  )
}

export default Container
