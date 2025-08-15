'use client'
import React from 'react'
import Heading from './heading'
import { Button } from './ui/button'
import { ActionItem } from '@/app/action/page'

function ActionDetails({ data }: { data: ActionItem[] }) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()

    URL.revokeObjectURL(url)
  }
  return (
    <div>
      <Heading title="Action" />
      <div className="flex flex-row items-center justify-center gap-6 p-4">
        <h1>Export Database</h1>
        <Button className="bg-second text-white" onClick={handleExport}>
          Export Data
        </Button>
      </div>
    </div>
  )
}

export default ActionDetails
