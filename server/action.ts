import { maxDues, minDues, totalDues } from './duesModel'

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
    throw new Error('Unable to fetch dashboard data')
  }
}
