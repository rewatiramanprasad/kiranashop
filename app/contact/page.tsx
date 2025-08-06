import React from 'react'
import ContactList from '@/components/ContactList'
import Container from '@/components/container'
async function ContactPage() {
  const res = await fetch('http://localhost:3000/api/contact')
  const data = await res.json()

  return (
    // <div className="bg-first flex flex-col items-center">
    // </div>
    <Container>
      <ContactList data={data.data} />
    </Container>
  )
}

export default ContactPage
