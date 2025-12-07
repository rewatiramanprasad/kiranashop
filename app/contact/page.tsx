import React from 'react'
import ContactList from '@/components/contactLists'
import Container from '@/components/container'
import { contactAction, ContactItem } from '@/server/action'

export const dynamic = 'force-dynamic'
export const fetchCache = 'default-no-store'

async function ContactPage() {
  let response: ContactItem[] | null = null
  let errorMessage: string | null = null

  try {
    response = await contactAction()
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching ContactPage:', error)
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
      <ContactList data={response!} />
    </Container>
  )
}

export default ContactPage
