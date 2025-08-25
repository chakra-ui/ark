import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Container } from 'styled-system/jsx'
import { auth } from '~/lib/auth'

interface Props {
  searchParams: Promise<{ orderId: string }>
}

export default async function Page(props: Props) {
  const { orderId } = await props.searchParams
  const session = await auth.api.getSession({ headers: await headers() })
  const authenticated = session !== null

  return <Container py="12" maxW="7xl"></Container>
}

export const metadata: Metadata = {
  title: 'Thank you',
}
