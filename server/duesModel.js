import { db } from './db.js'

export async function createCustomer(item) {
  return db('dues').insert(item)
}

export const getDues = async() => {
  return db('dues').select('*')
}

export const getProductById = async(id) => {
  return db('dues').where("id",id)
}

export const deleteProduct = async(id) => {
  return db('dues').delete(id)
}

export const getContact = async() => {
  return db('dues').select('name','mobile')
}