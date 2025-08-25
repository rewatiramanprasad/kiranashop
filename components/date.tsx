import React from 'react'

function DateFormat({ date }: { date: string }) {
  return (
    <div>
      {new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}
    </div>
  )
}

export default DateFormat
