'use client'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { FixedSizeList as List } from 'react-window'
import ListWithStrike from './listWithStrikes'
import ListWithoutStrike from './listWithoutStrikes'
import ListWithPayment from './listWithPayments'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setCustomerDetails } from '@/app/lib/customerDetailsSlice'
import { ListData, MemberItem } from '@/app/list/[id]/page'

function CustomerDetails({
  userData,
  listData,
}: {
  userData: MemberItem
  listData: ListData
}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { dueData, remainDues } = listData

  useEffect(() => {
    dispatch(
      setCustomerDetails({
        id: userData.id,
        name: userData.name,
        mobile: userData.mobile,
        dueList: dueData,
      })
    )
  }, [userData, dispatch])

  const handlePaid = (id: string) => {
    // Logic to handle marking an item as paid
    // alert(`Item with id ${id} marked as paid`)
    console.log(`Item with id ${id} marked as paid`)
  }
  const handleDues = () => {
    router.push(`/list/${userData.id}/addDues`)
  }
  const handlePayment = () => {
    router.push(`/list/${userData.id}/addPayment`)
  }
  return (
    <div className=" relative flex flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold tracking-wider text-white">
          {userData.name}
        </h1>
        <h2 className="text-xl  font-semibold text-gray-400">
          {userData.mobile}
        </h2>
      </div>
      <div className="flex flex-col  items-center justify-center  w-full">
        <List
          height={550}
          itemCount={dueData.length}
          itemSize={76 + 10}
          width={'100%'}
          itemData={dueData}
          className="  bg-first rounded shadow"
        >
          {({ index, style }) => {
            const item = dueData[index]
            if (item.dues_type === 'payment') {
              return <ListWithPayment style={style} item={item} />
            }
            return item.is_paid ? (
              <ListWithStrike style={style} item={item} />
            ) : (
              <ListWithoutStrike
                handlePaid={handlePaid}
                style={style}
                item={item}
              />
            )
          }}
        </List>
      </div>
      <div className=" fixed  bottom-13 grid grid-rows-2 items-center justify-center w-full">
        <h2 className="text-2xl  pl-8 tracking-wider pb-2 font-semibold text-gray-400">
          Total Dues: Rs:{remainDues.remaindues}
        </h2>
        <div className="flex flex-cols gap-6  w-full">
          <Button onClick={handleDues} className="bg-second px-10 text-white ">
            Add Dues
          </Button>

          <Button onClick={handlePayment} className="bg-second px-8 text-white">
            Add Payment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails
