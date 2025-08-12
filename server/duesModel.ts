import { db } from './db'

export interface DuesMember {
  id?: number,
  name: string,
  mobile: number,
  createAt?: string
}

export interface Dues {
  id?: number,
  member_id: number,
  amount: number,
  remarks?: string,
  is_paid: boolean,
  dues_type: string,
  createdAt?: string,
  updatedAt?: string
}

export async function createCustomer(item:DuesMember) {
  return db<DuesMember>('duesmember').insert(item)
}
export async function createDues(item:Dues) {
  return db<Dues>('dues').insert(item)
}
export async function createPayment(item:Dues) {
  return db<Dues>('dues').insert(item)
}

export const getDuesList = async() => {
  return db<Dues>('dues').sum('amount as amount').groupBy('member_id').join('duesmember', 'dues.member_id', 'duesmember.id').select('duesmember.name', 'duesmember.mobile','dues.member_id')
}

export const getDuesById = async(id:number) => {
  return db<Dues>('dues').where("member_id",id).orderBy('createdAt', 'asc')
}

export const getTotalAmountById = async(id:number) => {
  return db<Dues>('dues').where("member_id",id).select(db.raw('sum(amount)-sum(case when is_paid then amount else 0 end)- sum(case when dues_type then amount else 0 end) as remainDues '))
}

export const getMemberById = async (id:number) => {
  return db<DuesMember>('duesmember').select('id', 'name', 'mobile').where("id",id)
}
export const deleteProduct = async(id:number) => {
  return db<Dues>('dues').delete().where('id', id)
}

export const getContact = async() => {
  return db<DuesMember>('duesmember').select('name','mobile')
}