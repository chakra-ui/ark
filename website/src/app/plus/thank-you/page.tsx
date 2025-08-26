import { redirect } from 'next/navigation'

interface Props {
  searchParams: Promise<{ orderId: string }>
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams

  redirect(searchParams.orderId ? `/plus?claim=${searchParams.orderId}` : '/plus')
}
