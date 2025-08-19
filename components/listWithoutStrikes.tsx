import React from 'react'
import { Checkbox } from './ui/checkbox'
import { dueItem } from '@/app/list/[id]/page'

function ListWithoutStrike({
  style,
  item,
  handlePaid,
}: {
  style: React.CSSProperties
  item: dueItem
  handlePaid: (id: string) => void
  }) {
  return (
    <div
      style={style}
      key={item.id}
      className="p-4 border-y-8  border-first bg-third flex flex-row justify-start items-start gap-4"
    >
          <Checkbox
        onCheckedChange={() => {
          handlePaid(item.id)
        }}
        className="bg-second text-white"
      />
      <div className="pt-0">
        <h2 className="text-lg font-semibold">{item.createdAt}</h2>
        <article className="text-lg">
          {item.remarks + ' '}:<span>{' Rs.' + item.amount}</span>
        </article>
      </div>
    </div>
  )
}

export default ListWithoutStrike
