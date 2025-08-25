'use server'
import {
  createDues,
  createPayment,
  Dues,
  fetchAllMembersData,
  getContact,
  getDuesById,
  getMemberById,
  getTotalAmountById,
  maxDues,
  minDues,
  totalDues,
} from './duesModel'
import { DetailsItem, TotalDues } from './duesModel'

export interface ActionItem {
  id: string
  name: string
  mobile: string
  amount: number
  remarks: string
  is_paid: boolean
  dues_type: string
  createdAt: string
  updateAt: string
}

export interface ContactItem {
  id?: string
  name: string
  mobile: number
}

export async function dashboardAction(): Promise<{
  maxDues: string
  minDues: string
  total: string
}> {
  try {
    const max = await maxDues()
    const min = await minDues()
    const total = await totalDues()
    const data = {
      maxDues: max[0].name,
      minDues: min[0].name,
      total: total.rows[0].totaldues,
    }
    return data
  } catch (error) {
    console.log(error)
    throw new Error('failed to fetch dashboard data')
  }
}

export async function exportAction(): Promise<ActionItem[]> {
  try {
    const memberData: ActionItem[] = await fetchAllMembersData()
    return memberData
  } catch (error) {
    console.error(error)
    throw new Error('failed to fetch Action data')
  }
}
export async function contactAction(): Promise<ContactItem[]> {
  try {
    const contactData: ContactItem[] = await getContact()
    return contactData
  } catch (error) {
    console.error(error)
    throw new Error('failed to fetch contact data')
  }
}

export interface CustDetailsActionResponse {
  dueData: Dues[]
  totalAmount: TotalDues[]
  details: DetailsItem[]
}

export async function CustDetailsAction(
  id: string
): Promise<CustDetailsActionResponse> {
  try {
    const dueData = await getDuesById(id)
    const totalAmount = await getTotalAmountById(id)
    const details = await getMemberById(id)
    const response = {
      dueData,
      totalAmount,
      details,
    }
    return response
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch the CustDetails data ')
  }
}
interface AddPaymentProps {
  id: string
  name: string
  mobile: string
  amount: number
  remarks: string
  date: Date
}
export async function AddPaymentHandler(input: AddPaymentProps) {
  const { id, name, mobile, amount, remarks, date } = input
  try {
    await createPayment({
      member_id: id,
      amount: amount,
      is_paid: false,
      dues_type: 'payment',
      remarks: remarks || null,
    } as Dues)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to add payment')
  }
}
export async function AddDuesHandler(input: AddPaymentProps) {
  try {
    const { id, name, mobile, amount, remarks, date } = input
    await createDues({
      member_id: id,
      amount: amount,
      is_paid: false,
      dues_type: 'dues',
      remarks: remarks || null,
    } as Dues)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to add dues')
  }
}
