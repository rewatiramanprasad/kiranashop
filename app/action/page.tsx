import ActionDetails from '@/components/actionsDetails'
import Container from '@/components/container'
import { ActionItem, exportAction } from '@/server/action'
import React from 'react'

// export interface ActionItem {
//   id: number
//   name: string
//   mobile: number
//   amount: number
//   remarks: string | null
//   is_paid: number
//   dues_type: string
//   createdAt: Date
//   updateAt: string
// }

// export interface ActionResponse {
//   data: ActionItem[]
//   success: boolean
//   message: string
// }

async function ActionPage() {
  try {
    const response: ActionItem[] = await exportAction()
    return (
      <Container>
        <ActionDetails data={response} />
      </Container>
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching ActionPage:', error)
    return (
      <Container>
        <div className="text-red-500">
          <h1>Error</h1>
          <p>{message}</p>
        </div>
      </Container>
    )
  }
}

export default ActionPage
