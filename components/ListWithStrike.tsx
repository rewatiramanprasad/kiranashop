import React from 'react'
import { Checkbox } from './ui/checkbox'

function ListWithStrike({
  style,
  item,
}: {
  style: React.CSSProperties
  item: any
}) {
  return (
    <div
      style={style}
      key={item.id}
      className="p-4 border-y-8  border-first bg-third flex flex-row justify-start items-start gap-4"
    >
      <Checkbox checked className="bg-second" />
      <div className="pt-0">
        <h2 className="text-lg font-semibold">
          <s>{item.createdAt}</s>
        </h2>
        <article className="text-lg">
          <s>
            {item.remarks + ' '}:<span>{' Rs.' + item.amount}</span>
          </s>
        </article>
      </div>
    </div>
  )
}

export default ListWithStrike
