import React from 'react'

function Heading({ title }: { title: string }) {
    return (
      <h1 className="text-2xl font-bold tracking-wider flex justify-center pb-6 text-third">
        {title}
      </h1>
    )
}

export default Heading
