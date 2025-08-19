import {
  fetchAllMembersData,
  getContact,
  maxDues,
  minDues,
  totalDues,
} from './duesModel'

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
    console.error(error)
    console.log(error)
    throw new Error('failed to fetch the data')
  }
}

export async function exportAction(): Promise<ActionItem[]> {
  try {
    const memberData: ActionItem[] = await fetchAllMembersData()
    console.log(memberData)
    return memberData
  } catch (error) {
    console.error(error)
    console.log(error)
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
