'use server'
import { db } from './db'

export interface DuesMember {
  id?: string
  name: string
  mobile: number
  createAt?: string
}

export interface Dues {
  id?: string
  member_id: string
  amount: number
  remarks?: string
  is_paid: boolean
  dues_type: string
  createdAt?: string
  updateAt?: string
}

export interface Customer extends DuesMember {
  amount: number
  remarks?: string
}

export async function createCustomer(item: Customer) {
  try {
    const data = await db<DuesMember>('duesmember').insert(
      {
        name: item.name,
        mobile: item.mobile,
      },
      ['id']
    )
    console.log(data)
    const member_id = data[0]?.id
    if (!member_id) {
      throw new Error('Failed to create customer id')
    }
    if (data.length === 1) {
      return await createDues({
        member_id: member_id,
        amount: item.amount,
        remarks: item.remarks,
        is_paid: false,
        dues_type: 'dues',
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error('createCustomer failed')
  }
}
export async function createDues(item: Dues) {
  return db<Dues>('dues').insert(item)
}
export async function createPayment(item: Dues) {
  return db<Dues>('dues').insert(item)
}
export type ListItem = {
  name: string
  mobile: string
  id: string
  update: string
  amount: number
}
export const getDuesList = async (): Promise<ListItem[]> => {
  const res = await db<Dues>('dues')
    .join('duesmember', 'dues.member_id', 'duesmember.id')
    .select(
      'duesmember.name',
      'duesmember.mobile',
      'duesmember.id',
      db.raw(`max("dues"."updateAt") as update`),
      db.raw(
        `sum(CASE WHEN dues_type = 'dues' THEN amount ELSE 0 END)-sum(case when is_paid= true then amount else 0 end)- sum(case when dues_type= 'payment' then amount else 0 end) as amount`
      )
    )
    .groupBy('duesmember.name', 'duesmember.mobile', 'duesmember.id')
    .orderBy('update', 'desc')
  return res.map((item) => ({
    ...item,
    update: new Date(item.update).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  }))
}

export const getDuesById = async (id: string): Promise<Dues[]> => {
  const res = await db<Dues>('dues')
    .where('member_id', id)
    .orderBy('createdAt', 'desc')
  return res.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt!).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    updateAt: new Date(item.updateAt!).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  }))
}
export interface TotalDues {
  remainDues: number
}
export const getTotalAmountById = async (id: string): Promise<TotalDues[]> => {
  return await db<Dues>('dues')
    .where('member_id', id)
    .select(
      db.raw(
        ` SUM(CASE WHEN dues_type = 'dues' THEN amount ELSE 0 END) 
    - SUM(CASE WHEN is_paid = true THEN amount ELSE 0 END) 
    - SUM(CASE WHEN dues_type = 'payment' THEN amount ELSE 0 END)
  as "remainDues"`
      )
    )
    .groupBy('member_id')
}
export interface DetailsItem {
  name: string
  id?: string | undefined
  mobile: number
}
export const getMemberById = async (id: string): Promise<DetailsItem[]> => {
  return await db<DuesMember>('duesmember')
    .select('id', 'name', 'mobile')
    .where('id', id)
}
export const deleteProduct = async (id: string) => {
  return db<Dues>('dues').delete().where('id', id)
}

export const getContact = async () => {
  return db<DuesMember>('duesmember').select('name', 'mobile', 'id')
}

export const maxDues = async () => {
  const data = await db.raw(
    `select member_id,(sum(CASE WHEN dues_type = 'dues' THEN amount ELSE 0 END)-sum(case when is_paid=true  then amount else 0 end)- sum(case when dues_type='payment' then amount else 0 end))as remaindues from dues group by member_id order by remaindues desc limit 1`
  )

  const id = data.rows[0].member_id
  if (id === undefined) {
    throw new Error('id is undefined in maxDues')
  }
  return await db<DuesMember>('duesmember').select('name').where('id', id)
}

export const minDues = async () => {
  const data = await db.raw(
    `select member_id,(sum(CASE WHEN dues_type = 'dues' THEN amount ELSE 0 END)-sum(case when is_paid=true then amount else 0 end)- sum(case when dues_type='payment' then amount else 0 end))as remaindues from dues group by member_id order by remaindues asc limit 1`
  )

  const id = data.rows[0].member_id
  return await db<DuesMember>('duesmember').select('name').where('id', id)
}

export const totalDues = async () => {
  return db.raw(
    `select sum(remainDues)as totalDues from (select member_id,(sum(CASE WHEN dues_type = 'dues' THEN amount ELSE 0 END)-sum(case when is_paid=true then amount else 0 end)- sum(case when dues_type='payment' then amount else 0 end))as remaindues from dues group by member_id ) as totalDuesTable`
  )
}

export const fetchAllMembersData = async () => {
  return await db<DuesMember>('duesmember')
    .join('dues', 'duesmember.id', 'dues.member_id')
    .select(
      'duesmember.id',
      'duesmember.name',
      'duesmember.mobile',
      'dues.amount',
      'dues.remarks',
      'dues.is_paid',
      'dues.dues_type',
      'dues.createdAt',
      'dues.updateAt'
    )
}

export const deleteMember = async (id: String) => {
  try {
    await db<Dues>('dues').where('member_id', id).del();
    await db<DuesMember>('duesmember').where('id', id).del();
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete Member from model')
  }
}
