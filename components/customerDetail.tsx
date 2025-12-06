'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { FixedSizeList as List } from 'react-window'
import ListWithStrike from './listWithStrikes'
import ListWithoutStrike from './listWithoutStrikes'
import ListWithPayment from './listWithPayments'
import { redirect, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setCustomerDetails } from '@/app/lib/customerDetailsSlice'
import { CustDetailsActionResponse, deleteCustomer } from '@/server/action'
import { Separator } from './ui/separator'

function CustomerDetails({ data }: { data: CustDetailsActionResponse }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { dueData, totalAmount, details } = data
  const userData = details[0]

  useEffect(() => {
    dispatch(
      setCustomerDetails({
        id: userData.id,
        name: userData.name,
        mobile: userData.mobile,
        dueList: dueData,
      })
    )
  }, [userData, dueData, dispatch])

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
  const sendWhatsApp = ({
    name,
    mobile,
    amount,
  }: {
    name: string
    mobile: string
    amount: number
  }) => {
    const msg = `
Hello ${name},
Your due amount is ₹${amount}.
  `

    const url = `https://wa.me/${mobile}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    // onClick={()=>{sendWhatsApp({name:userData.name,mobile:`${userData.mobile}`,amount:totalAmount[0].remainDues})}}
  }
  const handleDelete = async (id: string) => {
    console.log(id)
    await deleteCustomer(id)
    redirect('/list')
  }

  return (
    <div className=" relative flex flex-col items-center justify-center gap-0">
      <div className="flex flex-row items-center justify-between gap-16">
        <div>
          <h1 className="text-2xl capitalize font-bold tracking-wider text-white">
            {userData.name}
          </h1>
          <h2 className="text-lg font-semibold text-gray-400">
            {userData.mobile}
          </h2>
        </div>
        <div>
          {/* <button className='bg-chart-2 text-white border border-chart-2 rounded p-2'
          >whatsapp</button> */}

          {/* <ActionButton/> */}
          <div className="bg-transparent">
            <button
              onClick={() => setOpen(!open)}
              onBlur={()=>setOpen(false)}
              className="bg-chart-2 text-white border border-chart-2 rounded p-2"
            >
              Actions
            </button>
            {open && (
              <div className=" absolute z-1 mt-1 p-2 flex flex-col justify-center items-center bg-white rounded-xl">
                <button
                  onClick={() => {
                    sendWhatsApp({
                      name: userData.name,
                      mobile: `${userData.mobile}`,
                      amount: totalAmount[0].remainDues,
                    })
                  }}
                  className="bg-white"
                >
                  whatsapp
                </button>
                <Separator orientation="horizontal" />
                <button onClick={() => handleDelete(userData.id!)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <List
          height={490}
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
      <div className="fixed bottom-13 grid grid-rows-2 items-center justify-center w-full">
        <h2 className="text-2xl  pl-8 tracking-wider  font-semibold text-gray-400">
          Total Dues: Rs:{totalAmount[0].remainDues}
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
