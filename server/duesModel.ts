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
  updatedAt?: string
}

export interface Customer extends DuesMember {
  amount: number
  remarks?: string
}

export async function createCustomer(item: Customer) {
  const data = await db<DuesMember>('duesmember').insert(
    {
      name: item.name,
      mobile: item.mobile,
    },
    ['id']
  )
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
}
export async function createDues(item: Dues) {
  return db<Dues>('dues').insert(item)
}
export async function createPayment(item: Dues) {
  return db<Dues>('dues').insert(item)
}

export const getDuesList = async () => {
  return await db<Dues>('dues')
    .groupBy('member_id')
    .join('duesmember', 'dues.member_id', 'duesmember.id')
    .select(
      'duesmember.name',
      'duesmember.mobile',
      'dues.member_id',
      'dues.updateAt',
      db.raw(
        `sum(amount)-sum(case when is_paid= true then amount else 0 end)- sum(case when dues_type= 'payment' then amount else 0 end) as amount`
      )
    )
    .groupBy(
      'duesmember.name',
      'duesmember.mobile',
      'dues.member_id',
      'dues.updateAt'
    )
    .orderBy('duesmember.name', 'asc')
}

export const getDuesById = async (id: string) => {
  return db<Dues>('dues').where('member_id', id).orderBy('createdAt', 'asc')
}

export const getTotalAmountById = async (id: string) => {
  return db<Dues>('dues')
    .where('member_id', id)
    .select(
      db.raw(
        `(sum(amount)-sum(case when is_paid=true then amount else 0 end)-sum(case when dues_type='payment' then amount else 0 end)) as remainDues`
      )
    )
    .groupBy('member_id')
}

export const getMemberById = async (id: string) => {
  return db<DuesMember>('duesmember')
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
    `select member_id,(sum(amount)-sum(case when is_paid=true  then amount else 0 end)- sum(case when dues_type='payment' then amount else 0 end))as remaindues from dues group by member_id order by remaindues desc limit 1`
  )
  console.log('maxDues data:', data)
  const id = data.rows[0].member_id
  if (id === undefined) {
    throw new Error('id is undefined in maxDues')
  }
  return await db<DuesMember>('duesmember').select('name').where('id', id)
}

export const minDues = async () => {
  const data = await db.raw(
    `select member_id,(sum(amount)-sum(case when is_paid=true then amount else 0 end)- sum(case when dues_type='payment' then amount else 0 end))as remaindues from dues group by member_id order by remaindues asc limit 1`
  )

  const id = data.rows[0].member_id
  return await db<DuesMember>('duesmember').select('name').where('id', id)
}

export const totalDues = async () => {
  return db.raw(
    `select sum(remainDues)as totalDues from (select member_id,(sum(amount)-sum(case when is_paid=true then amount else 0 end)- sum(case when dues_type='payment' then amount else 0 end))as remaindues from dues group by member_id ) as totalDuesTable`
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
