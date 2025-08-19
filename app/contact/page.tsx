import React from 'react'
import ContactList from '@/components/contactLists'
import Container from '@/components/container'
import { contactAction } from '@/server/action'

async function ContactPage() {
  try {
    const response = await contactAction()

    return (
      <Container>
        <ContactList data={response} />
      </Container>
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching ContactPage:', error)
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

export default ContactPage
