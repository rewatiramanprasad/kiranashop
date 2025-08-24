import React from 'react'
import { Checkbox } from './ui/checkbox'
import { Dues } from '@/server/duesModel'

function ListWithPayment({
  style,
  item,
}: {
  style: React.CSSProperties
  item: Dues
}) {
  return (
    <div
      style={style}
      key={item.id}
      className="p-4 border-y-8 border-first bg-second flex flex-row justify-start items-start gap-4"
    >
      <Checkbox checked className="bg-third" />
      <div className="pt-0">
        <h2 className="text-lg font-semibold">
          {new Date(item.createdAt!).toLocaleDateString()}
        </h2>
        <article className="text-lg">
          {'Paid '} :<span>{' Rs.' + item.amount}</span>
        </article>
      </div>
    </div>
  )
}

export default ListWithPayment
