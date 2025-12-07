import ActionDetails from '@/components/actionsDetails'
import Container from '@/components/container'
import { ActionItem, exportAction } from '@/server/action'
import React from 'react'

export default async function ActionPage() {
  let response: ActionItem[] | null = null
  let errorMessage: string | null = null

  try {
     response = await exportAction()
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching ActionPage:', error)
  }

  if (errorMessage) {
    return (
      <Container>
        <div className="text-red-500">
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </Container>
    )
  }
  return (
    <Container>
      <ActionDetails data={response!} />
    </Container>
  )
}
