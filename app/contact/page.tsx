import React from 'react'
import ContactList from '@/components/contactLists'
import Container from '@/components/container'

interface ContactItem {
  id: number
  name: string
  email: string
}
interface ContactResponse {
  data: ContactItem[]
  success: boolean
  message: string
}
async function ContactPage() {
  try {
    const res = await fetch('http://localhost:3000/api/contact')
    const data: ContactResponse = await res.json()
    if (!data.success) {
      throw new Error(data.message)
    }

    return (
      <Container>
        <ContactList data={data.data} />
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
